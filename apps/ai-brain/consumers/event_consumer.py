# ============================================================
# NexusAI — RabbitMQ Event Consumer
# Resilient consumer with retry, DLQ, idempotency
# ============================================================

import json
import logging
import threading
import time
from typing import Optional

import pika
from pika.adapters.blocking_connection import BlockingChannel

from config import settings
from db.pgvector_client import is_already_processed, mark_as_processed
from models.events import TrackingEvent
from services.persona_classifier import classify_user, should_recompute

logger = logging.getLogger(__name__)

_consumer_thread: Optional[threading.Thread] = None
_should_stop = False


def start_consumer() -> None:
    """Start the RabbitMQ consumer in a background thread."""
    global _consumer_thread, _should_stop
    _should_stop = False
    _consumer_thread = threading.Thread(target=_run_consumer, daemon=True)
    _consumer_thread.start()
    logger.info("RabbitMQ consumer thread started")


def stop_consumer() -> None:
    """Signal the consumer thread to stop."""
    global _should_stop
    _should_stop = True
    logger.info("RabbitMQ consumer stop signal sent")


def _run_consumer() -> None:
    """Main consumer loop with automatic reconnection."""
    while not _should_stop:
        try:
            _connect_and_consume()
        except pika.exceptions.AMQPConnectionError as e:
            logger.warning("RabbitMQ connection lost: %s — reconnecting in 5s", e)
            time.sleep(5)
        except Exception as e:
            logger.error("Consumer error: %s — reconnecting in 5s", e)
            time.sleep(5)


def _connect_and_consume() -> None:
    """Establish connection, declare topology, and start consuming."""
    credentials = pika.PlainCredentials(
        settings.RABBITMQ_USER,
        settings.RABBITMQ_PASSWORD,
    )
    parameters = pika.ConnectionParameters(
        host=settings.RABBITMQ_HOST,
        port=settings.RABBITMQ_PORT,
        credentials=credentials,
        heartbeat=600,
        blocked_connection_timeout=300,
    )

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    # --- Declare exchange ---
    channel.exchange_declare(
        exchange=settings.EXCHANGE_NAME,
        exchange_type="topic",
        durable=True,
    )

    # --- Declare DLQ first ---
    channel.queue_declare(
        queue=settings.PERSONA_DLQ,
        durable=True,
    )

    # --- Declare main queue with DLQ binding ---
    channel.queue_declare(
        queue=settings.PERSONA_QUEUE,
        durable=True,
        arguments={
            "x-dead-letter-exchange": "",
            "x-dead-letter-routing-key": settings.PERSONA_DLQ,
            "x-message-ttl": 30000,  # 30 seconds for retry delay
        },
    )

    # --- Bind queue to exchange ---
    for routing_key in ["event.click", "event.purchase", "event.product_view", "event.*"]:
        channel.queue_bind(
            exchange=settings.EXCHANGE_NAME,
            queue=settings.PERSONA_QUEUE,
            routing_key=routing_key,
        )

    # --- Set prefetch (process 1 message at a time for MacBook 2017) ---
    channel.basic_qos(prefetch_count=1)

    # --- Start consuming ---
    channel.basic_consume(
        queue=settings.PERSONA_QUEUE,
        on_message_callback=_process_message,
        auto_ack=False,
    )

    logger.info(
        "RabbitMQ consumer ready — queue=%s, exchange=%s, dlq=%s",
        settings.PERSONA_QUEUE,
        settings.EXCHANGE_NAME,
        settings.PERSONA_DLQ,
    )

    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        channel.stop_consuming()
    finally:
        connection.close()


def _process_message(
    ch: BlockingChannel,
    method: pika.spec.Basic.Deliver,
    properties: pika.BasicProperties,
    body: bytes,
) -> None:
    """Process a single message with retry and idempotency.

    Resilience design:
    1. Idempotency check (skip if already processed)
    2. Validate payload with Pydantic
    3. Process event (feature extraction → classification if needed)
    4. Mark as processed
    5. ACK only after successful processing
    6. After MAX_RETRY_COUNT failures → NACK (sent to DLQ)
    """
    headers = properties.headers or {}
    retry_count = headers.get("x-retry-count", 0)
    event_id = headers.get("x-event-id", "")

    try:
        # 1. Idempotency check
        if event_id and is_already_processed(event_id):
            logger.debug("Event %s already processed — skipping", event_id)
            ch.basic_ack(delivery_tag=method.delivery_tag)
            return

        # 2. Parse and validate
        raw_data = json.loads(body.decode("utf-8"))
        event = TrackingEvent(**raw_data)

        logger.info(
            "Processing event: id=%s, type=%s, user=%s",
            event_id, event.type, event.user_id,
        )

        # 3. Process — check if persona recompute is needed
        import asyncio
        loop = asyncio.new_event_loop()
        needs_recompute = loop.run_until_complete(
            should_recompute(event.user_id, event.type)
        )
        loop.close()

        if needs_recompute:
            logger.info("Recomputing persona for user %s (trigger: %s)", event.user_id, event.type)
            classify_user(event.user_id)
        else:
            logger.debug("Persona recompute not needed for user %s", event.user_id)

        # 4. Mark as processed
        if event_id:
            mark_as_processed(event_id)

        # 5. ACK after success
        ch.basic_ack(delivery_tag=method.delivery_tag)
        logger.info("Event %s processed successfully", event_id)

    except Exception as e:
        if retry_count >= settings.MAX_RETRY_COUNT:
            logger.error(
                "Event %s failed %d times — sending to DLQ: %s",
                event_id, settings.MAX_RETRY_COUNT, e,
            )
            # NACK without requeue → goes to DLQ
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
        else:
            logger.warning(
                "Event %s retry %d/%d: %s",
                event_id, retry_count + 1, settings.MAX_RETRY_COUNT, e,
            )
            # NACK with requeue for retry
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)

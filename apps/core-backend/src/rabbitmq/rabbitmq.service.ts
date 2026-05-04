import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import * as amqplib from 'amqplib';

/**
 * RabbitMQ service for publishing events to the nexus-events exchange.
 *
 * Used by analytics module to forward behavioral events to ai-brain
 * for persona classification.
 */
@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQService.name);
  private connection: any = null;
  private channel: any = null;

  private readonly EXCHANGE_NAME = 'nexus-events';
  private readonly RABBITMQ_URL =
    process.env.RABBITMQ_URL || 'amqp://nexus:nexus_dev_password@localhost:5672';

  async onModuleInit(): Promise<void> {
    try {
      await this.connect();
      this.logger.log('RabbitMQ connected successfully');
    } catch (error) {
      this.logger.warn(
        `RabbitMQ connection failed: ${error} — events won't be published to ai-brain`,
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      if (this.channel) await this.channel.close();
      if (this.connection) await this.connection.close();
      this.logger.log('RabbitMQ connection closed');
    } catch (error) {
      this.logger.error(`Error closing RabbitMQ: ${error}`);
    }
  }

  private async connect(): Promise<void> {
    this.connection = await amqplib.connect(this.RABBITMQ_URL);
    this.channel = await this.connection.createChannel();

    // Declare the topic exchange
    await this.channel.assertExchange(this.EXCHANGE_NAME, 'topic', {
      durable: true,
    });

    this.logger.log(`Exchange "${this.EXCHANGE_NAME}" declared`);
  }

  /**
   * Publish a tracking event to the nexus-events exchange.
   *
   * @param routingKey - e.g., "event.click", "event.purchase", "event.product_view"
   * @param payload - The event data to publish
   * @param eventId - Unique event ID for idempotency
   */
  async publishEvent(
    routingKey: string,
    payload: Record<string, unknown>,
    eventId?: string,
  ): Promise<boolean> {
    if (!this.channel) {
      this.logger.warn('RabbitMQ channel not available — event not published');
      return false;
    }

    try {
      const message = Buffer.from(JSON.stringify(payload));

      this.channel.publish(this.EXCHANGE_NAME, routingKey, message, {
        persistent: true,
        contentType: 'application/json',
        headers: {
          'x-event-id': eventId || '',
          'x-retry-count': 0,
        },
      });

      this.logger.debug(
        `Event published: key=${routingKey}, eventId=${eventId}`,
      );
      return true;
    } catch (error) {
      this.logger.error(`Failed to publish event: ${error}`);
      return false;
    }
  }
}

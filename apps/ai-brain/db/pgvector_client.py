# ============================================================
# NexusAI — PostgreSQL + pgvector Client
# Connection pool, persona upsert, embedding storage, event queries
# ============================================================

import logging
from contextlib import contextmanager
from datetime import datetime, timedelta
from typing import Optional, Generator

import psycopg2
import psycopg2.pool
from psycopg2.extras import Json, RealDictCursor

from config import settings

logger = logging.getLogger(__name__)

# --- Connection Pool (MacBook 2017: max 3 connections) ---

_pool: Optional[psycopg2.pool.SimpleConnectionPool] = None


def init_pool() -> None:
    """Initialize the PostgreSQL connection pool."""
    global _pool
    if _pool is not None:
        return

    _pool = psycopg2.pool.SimpleConnectionPool(
        minconn=settings.DATABASE_POOL_MIN,
        maxconn=settings.DATABASE_POOL_MAX,
        host=settings.DATABASE_HOST,
        port=settings.DATABASE_PORT,
        user=settings.DATABASE_USER,
        password=settings.DATABASE_PASSWORD,
        dbname=settings.DATABASE_NAME,
    )
    logger.info(
        "PostgreSQL pool initialized (min=%d, max=%d)",
        settings.DATABASE_POOL_MIN,
        settings.DATABASE_POOL_MAX,
    )


def close_pool() -> None:
    """Close all connections in the pool."""
    global _pool
    if _pool:
        _pool.closeall()
        _pool = None
        logger.info("PostgreSQL pool closed")


@contextmanager
def get_connection() -> Generator:
    """Get a connection from the pool with automatic return."""
    if _pool is None:
        init_pool()

    conn = _pool.getconn()  # type: ignore[union-attr]
    try:
        yield conn
    finally:
        _pool.putconn(conn)  # type: ignore[union-attr]


# --- Persona Operations ---

def upsert_user_persona(
    user_id: str,
    persona_type: str,
    traits: dict,
    confidence: float,
    rule_version: str,
) -> None:
    """Upsert persona directly into UserPersona table.

    MVP approach: write DB directly. Scale phase will switch to
    event-based sync via RabbitMQ.
    """
    traits_json = {
        "type": persona_type,
        "confidence": confidence,
        "rule_version": rule_version,
        **traits,
    }

    with get_connection() as conn:
        with conn.cursor() as cur:
            # Check if persona exists for this user
            cur.execute(
                'SELECT id FROM "UserPersona" WHERE "userId" = %s LIMIT 1',
                (user_id,),
            )
            existing = cur.fetchone()

            if existing:
                cur.execute(
                    """
                    UPDATE "UserPersona"
                    SET traits = %s, "updatedAt" = NOW()
                    WHERE "userId" = %s
                    """,
                    (Json(traits_json), user_id),
                )
            else:
                cur.execute(
                    """
                    INSERT INTO "UserPersona" (id, "userId", traits, "createdAt", "updatedAt")
                    VALUES (gen_random_uuid(), %s, %s, NOW(), NOW())
                    """,
                    (user_id, Json(traits_json)),
                )
        conn.commit()
        logger.info("Persona upserted: user=%s, type=%s, confidence=%.2f", user_id, persona_type, confidence)


def get_user_persona(user_id: str) -> Optional[dict]:
    """Get the current persona for a user."""
    with get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT id, "userId", traits, "createdAt", "updatedAt"
                FROM "UserPersona"
                WHERE "userId" = %s
                LIMIT 1
                """,
                (user_id,),
            )
            row = cur.fetchone()
            return dict(row) if row else None


def get_last_persona_update(user_id: str) -> Optional[datetime]:
    """Get the timestamp of the last persona update for a user."""
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT "updatedAt" FROM "UserPersona" WHERE "userId" = %s LIMIT 1',
                (user_id,),
            )
            row = cur.fetchone()
            return row[0] if row else None


# --- Event Queries ---

def get_user_events(user_id: str, days: int = 30) -> list[dict]:
    """Get user events from the last N days for feature extraction."""
    cutoff = datetime.utcnow() - timedelta(days=days)

    with get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT id, type, payload, "userId", timestamp, "createdAt"
                FROM "UserEvent"
                WHERE "userId" = %s AND timestamp >= %s
                ORDER BY timestamp DESC
                """,
                (user_id, cutoff),
            )
            return [dict(row) for row in cur.fetchall()]


def get_active_user_ids(days: int = 7) -> list[str]:
    """Get user IDs with recent activity."""
    cutoff = datetime.utcnow() - timedelta(days=days)

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT DISTINCT "userId"
                FROM "UserEvent"
                WHERE timestamp >= %s
                """,
                (cutoff,),
            )
            return [row[0] for row in cur.fetchall()]


# --- Embedding Operations ---

def store_product_embedding(product_id: str, embedding: list[float]) -> None:
    """Store embedding vector into Product.vector column via pgvector."""
    vector_str = "[" + ",".join(str(x) for x in embedding) + "]"

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                'UPDATE "Product" SET vector = %s::vector WHERE id = %s',
                (vector_str, product_id),
            )
        conn.commit()
        logger.info("Product embedding stored: product_id=%s, dims=%d", product_id, len(embedding))


def get_product_for_embedding(product_id: str) -> Optional[dict]:
    """Get product data needed for embedding generation."""
    with get_connection() as conn:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """
                SELECT p.id, p.name, p.description, p.slug,
                       c.name as category_name
                FROM "Product" p
                LEFT JOIN "Category" c ON p."categoryId" = c.id
                WHERE p.id = %s AND p."deletedAt" IS NULL
                """,
                (product_id,),
            )
            row = cur.fetchone()
            return dict(row) if row else None


# --- Idempotency ---

# In-memory set for MVP. Scale phase: use Redis.
_processed_events: set[str] = set()


def is_already_processed(event_id: str) -> bool:
    """Check if an event has already been processed (idempotency)."""
    return event_id in _processed_events


def mark_as_processed(event_id: str) -> None:
    """Mark an event as processed."""
    _processed_events.add(event_id)
    # Prevent unbounded growth — keep last N events
    if len(_processed_events) > settings.MAX_EVENT_BUFFER:
        # Remove oldest (set doesn't preserve order, but this is MVP)
        _processed_events.pop()

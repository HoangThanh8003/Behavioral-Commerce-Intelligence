# ============================================================
# NexusAI — Embedding Service
# Mock (dev) + OpenAI (production) embedding generation
# ============================================================

import hashlib
import logging
from typing import Optional

import numpy as np

from config import settings

logger = logging.getLogger(__name__)

# Lazy-loaded OpenAI client
_openai_client = None


def _get_openai_client():
    """Lazy load OpenAI client — only when needed (MacBook 2017 optimization)."""
    global _openai_client
    if _openai_client is None:
        from openai import OpenAI
        _openai_client = OpenAI(api_key=settings.OPENAI_API_KEY)
    return _openai_client


def generate_embedding(text: str) -> list[float]:
    """Generate embedding vector from text.

    Supports two modes:
    - MOCK: Deterministic pseudo-random vector (same input = same output)
    - OPENAI: Real embeddings via text-embedding-3-small

    Args:
        text: Input text to embed

    Returns:
        List of floats with EMBEDDING_DIMENSIONS dimensions
    """
    if settings.EMBEDDING_MODE == "MOCK":
        return _generate_mock_embedding(text)

    return _generate_openai_embedding(text)


def generate_product_embedding(
    name: str,
    description: Optional[str],
    category_name: Optional[str],
) -> list[float]:
    """Generate embedding for a product using its attributes.

    Constructs a structured text representation from product data,
    then generates the embedding.

    Args:
        name: Product name
        description: Product description (can be None)
        category_name: Category name (can be None)

    Returns:
        Embedding vector
    """
    parts: list[str] = [f"Product: {name}"]
    if category_name:
        parts.append(f"Category: {category_name}")
    if description:
        parts.append(f"Description: {description}")

    text = ". ".join(parts)
    logger.info("Generating product embedding for: %s", name)
    return generate_embedding(text)


def generate_user_behavior_embedding(feature_text: str) -> list[float]:
    """Generate embedding for user behavioral features.

    Uses the text representation from UserBehavioralFeatures.to_feature_text()

    Args:
        feature_text: Structured text describing user behavior

    Returns:
        Embedding vector
    """
    logger.info("Generating user behavior embedding (text length: %d)", len(feature_text))
    return generate_embedding(feature_text)


def _generate_mock_embedding(text: str) -> list[float]:
    """Generate deterministic mock embedding — same input always produces same output.

    Uses MD5 hash as seed for numpy random generator. This ensures
    reproducible results across runs while still producing realistic-looking vectors.
    """
    seed = int(hashlib.md5(text.encode()).hexdigest(), 16) % (2**32)
    rng = np.random.RandomState(seed)
    vector = rng.randn(settings.EMBEDDING_DIMENSIONS).astype(float)
    # Normalize to unit vector (like real embeddings)
    norm = np.linalg.norm(vector)
    if norm > 0:
        vector = vector / norm
    return vector.tolist()


def _generate_openai_embedding(text: str) -> list[float]:
    """Generate real embedding via OpenAI API.

    Uses text-embedding-3-small (1536 dimensions) by default.
    """
    if not settings.OPENAI_API_KEY:
        logger.warning("OPENAI_API_KEY not set — falling back to mock embeddings")
        return _generate_mock_embedding(text)

    try:
        client = _get_openai_client()
        response = client.embeddings.create(
            model=settings.EMBEDDING_MODEL,
            input=text,
        )
        embedding = response.data[0].embedding
        logger.info("OpenAI embedding generated: dims=%d", len(embedding))
        return embedding
    except Exception as e:
        logger.error("OpenAI embedding failed, falling back to mock: %s", e)
        return _generate_mock_embedding(text)

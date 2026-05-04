# ============================================================
# NexusAI — Persona Output Models
# Classification results and API response shapes
# ============================================================

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class PersonaResult(BaseModel):
    """Result of persona classification for a single user."""

    model_config = ConfigDict(strict=True)

    user_id: str
    persona_type: str  # IMPULSE_BUYER, RESEARCHER, LOYAL_CUSTOMER, EXPLORER
    confidence: float = Field(ge=0.0, le=1.0)
    rule_version: str  # e.g., "1.0.0"
    mode: str  # "RULE_BASED" or "VECTOR_SIMILARITY"
    scores: dict[str, float] = {}  # per-persona scores for transparency
    computed_at: datetime = Field(default_factory=datetime.utcnow)


class PersonaResponse(BaseModel):
    """API response for persona queries."""

    user_id: str
    persona_type: str
    confidence: float
    traits: dict
    computed_at: Optional[str] = None


class ClassifyRequest(BaseModel):
    """Request body for manual persona classification."""

    user_id: str


class RecomputeRequest(BaseModel):
    """Request body for batch recompute."""

    user_ids: Optional[list[str]] = None  # None = all active users
    force: bool = False  # Force recompute even if recently computed


class EmbeddingRequest(BaseModel):
    """Request body for embedding generation."""

    product_id: str
    text: str


class EmbeddingBatchRequest(BaseModel):
    """Request body for batch embedding generation."""

    items: list[EmbeddingRequest]


class EmbeddingResponse(BaseModel):
    """Response for embedding operations."""

    product_id: str
    dimensions: int
    stored: bool
    message: str

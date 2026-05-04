# ============================================================
# NexusAI — Persona Router
# Endpoints for persona queries, classification, and recompute
# ============================================================

import asyncio
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException

from config import settings
from db.pgvector_client import get_user_persona, get_active_user_ids
from models.personas import (
    ClassifyRequest,
    PersonaResponse,
    RecomputeRequest,
)
from services.persona_classifier import classify_user

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/personas", tags=["Personas"])


@router.get("/{user_id}", response_model=PersonaResponse)
async def get_persona(user_id: str) -> PersonaResponse:
    """Get the current persona for a user.

    Returns the stored persona from the database. If no persona exists,
    triggers classification on-the-fly.
    """
    persona = get_user_persona(user_id)

    if persona is None:
        # No persona yet — classify now
        logger.info("No persona found for user %s — classifying now", user_id)
        result = classify_user(user_id)
        return PersonaResponse(
            user_id=result.user_id,
            persona_type=result.persona_type,
            confidence=result.confidence,
            traits={
                "scores": result.scores,
                "mode": result.mode,
                "rule_version": result.rule_version,
            },
            computed_at=result.computed_at.isoformat(),
        )

    traits = persona.get("traits", {})
    return PersonaResponse(
        user_id=user_id,
        persona_type=traits.get("type", "EXPLORER"),
        confidence=traits.get("confidence", 0.0),
        traits=traits,
        computed_at=str(persona.get("updatedAt", "")),
    )


@router.post("/classify")
async def classify(request: ClassifyRequest) -> dict:
    """Manually trigger persona classification for a user.

    Pipeline: Feature Extraction → Classification → Persistence
    """
    try:
        result = classify_user(request.user_id)
        return {
            "status": "classified",
            "user_id": result.user_id,
            "persona_type": result.persona_type,
            "confidence": result.confidence,
            "rule_version": result.rule_version,
            "mode": result.mode,
            "scores": result.scores,
        }
    except Exception as e:
        logger.error("Classification failed for user %s: %s", request.user_id, e)
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")


@router.post("/recompute")
async def recompute(request: RecomputeRequest) -> dict:
    """Batch recompute personas for multiple users.

    If no user_ids provided, recomputes for all active users (last 7 days).
    Batch size is limited for MacBook 2017 optimization.
    """
    user_ids = request.user_ids

    if not user_ids:
        user_ids = get_active_user_ids(days=7)
        logger.info("Recomputing personas for %d active users", len(user_ids))

    results: list[dict] = []
    errors: list[dict] = []

    for i in range(0, len(user_ids), settings.BATCH_SIZE):
        batch = user_ids[i : i + settings.BATCH_SIZE]

        for uid in batch:
            try:
                result = classify_user(uid)
                results.append({
                    "user_id": result.user_id,
                    "persona_type": result.persona_type,
                    "confidence": result.confidence,
                })
            except Exception as e:
                errors.append({"user_id": uid, "error": str(e)})

        # Throttle between batches (MacBook 2017 optimization)
        if i + settings.BATCH_SIZE < len(user_ids):
            await asyncio.sleep(settings.THROTTLE_DELAY_SEC)

    return {
        "status": "completed",
        "total_processed": len(results),
        "total_errors": len(errors),
        "results": results,
        "errors": errors,
    }

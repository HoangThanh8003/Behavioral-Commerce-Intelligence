# ============================================================
# NexusAI — Health Router
# ============================================================

from fastapi import APIRouter

from config import settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health() -> dict:
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "persona_mode": settings.PERSONA_MODE,
        "embedding_mode": settings.EMBEDDING_MODE,
    }

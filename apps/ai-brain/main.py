# ============================================================
# NexusAI Brain — FastAPI Application Entry Point
# Intelligence service: Persona Engine + Embedding Pipeline
# ============================================================

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup and shutdown lifecycle."""
    # --- Startup ---
    logger.info("🧠 %s starting on port %d", settings.APP_NAME, settings.APP_PORT)
    logger.info("   Persona mode: %s", settings.PERSONA_MODE)
    logger.info("   Embedding mode: %s", settings.EMBEDDING_MODE)

    # Initialize DB pool
    from db.pgvector_client import init_pool
    try:
        init_pool()
        logger.info("   PostgreSQL pool: connected")
    except Exception as e:
        logger.warning("   PostgreSQL pool: failed (%s) — will retry on first query", e)

    # Start RabbitMQ consumer
    try:
        from consumers.event_consumer import start_consumer
        start_consumer()
        logger.info("   RabbitMQ consumer: started")
    except Exception as e:
        logger.warning("   RabbitMQ consumer: failed to start (%s) — events won't be processed", e)

    logger.info("🟢 %s is ready", settings.APP_NAME)

    yield

    # --- Shutdown ---
    logger.info("🔴 %s shutting down...", settings.APP_NAME)

    from consumers.event_consumer import stop_consumer
    stop_consumer()

    from db.pgvector_client import close_pool
    close_pool()

    logger.info("👋 %s stopped", settings.APP_NAME)


# --- FastAPI App ---

app = FastAPI(
    title=settings.APP_NAME,
    description="Invisible intelligence layer — persona classification, embedding generation, behavioral analytics",
    version="1.0.0",
    lifespan=lifespan,
)

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Register Routers ---
from routers.health import router as health_router
from routers.personas import router as personas_router
from routers.embeddings import router as embeddings_router

app.include_router(health_router)
app.include_router(personas_router)
app.include_router(embeddings_router)


@app.get("/")
async def root() -> dict:
    """Root endpoint."""
    return {"message": f"{settings.APP_NAME} is active", "version": "1.0.0"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.APP_PORT,
        reload=settings.DEBUG,
    )

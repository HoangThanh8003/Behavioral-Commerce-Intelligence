# ============================================================
# NexusAI — AI Brain Configuration
# Pydantic v2 BaseSettings for all service config
# ============================================================

from pydantic_settings import BaseSettings
from pydantic import ConfigDict


class Settings(BaseSettings):
    """AI Brain service configuration — loaded from .env"""

    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # --- App ---
    APP_NAME: str = "NexusAI Brain"
    APP_PORT: int = 8000
    DEBUG: bool = True

    # --- Database (PostgreSQL + pgvector) ---
    DATABASE_HOST: str = "localhost"
    DATABASE_PORT: int = 5433
    DATABASE_USER: str = "nexus"
    DATABASE_PASSWORD: str = "nexus_dev_password"
    DATABASE_NAME: str = "nexus_ai"
    DATABASE_POOL_MIN: int = 1
    DATABASE_POOL_MAX: int = 3  # MacBook 2017 optimization

    @property
    def database_url(self) -> str:
        return (
            f"postgresql://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}"
            f"@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"
        )

    # --- RabbitMQ ---
    RABBITMQ_HOST: str = "localhost"
    RABBITMQ_PORT: int = 5672
    RABBITMQ_USER: str = "nexus"
    RABBITMQ_PASSWORD: str = "nexus_dev_password"
    EXCHANGE_NAME: str = "nexus-events"
    PERSONA_QUEUE: str = "ai-brain-persona-queue"
    PERSONA_DLQ: str = "ai-brain-persona-dlq"
    MAX_RETRY_COUNT: int = 3

    @property
    def rabbitmq_url(self) -> str:
        return (
            f"amqp://{self.RABBITMQ_USER}:{self.RABBITMQ_PASSWORD}"
            f"@{self.RABBITMQ_HOST}:{self.RABBITMQ_PORT}"
        )

    # --- Embedding ---
    EMBEDDING_MODE: str = "MOCK"  # "MOCK" (dev) | "OPENAI" (production)
    OPENAI_API_KEY: str = ""
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    EMBEDDING_DIMENSIONS: int = 1536

    # --- Persona Engine ---
    PERSONA_MODE: str = "RULE_BASED"  # "RULE_BASED" (MVP) | "VECTOR_SIMILARITY" (upgrade)
    FEATURE_WINDOW_DAYS: int = 30  # Aggregate events from last N days
    BATCH_SIZE: int = 5  # MacBook 2017 optimization — max items per batch

    # --- Performance (MacBook 2017) ---
    MAX_EVENT_BUFFER: int = 100
    THROTTLE_DELAY_SEC: float = 1.0


settings = Settings()

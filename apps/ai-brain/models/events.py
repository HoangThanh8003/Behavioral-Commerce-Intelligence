# ============================================================
# NexusAI — Event Pydantic Models
# Source of Truth: packages/event-schema/events.json
# ============================================================

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class BaseEvent(BaseModel):
    """Base event structure — all events must include these fields."""

    model_config = ConfigDict(strict=True)

    event_id: Optional[str] = None
    user_id: str
    type: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ClickEventPayload(BaseModel):
    """Payload for CLICK events — matches event-schema."""

    element_id: str = Field(alias="elementId")
    page_url: str = Field(alias="pageUrl")

    model_config = ConfigDict(populate_by_name=True)


class PurchaseEventPayload(BaseModel):
    """Payload for PURCHASE events — matches event-schema."""

    product_id: str = Field(alias="productId")
    amount: float
    currency: str = "USD"

    model_config = ConfigDict(populate_by_name=True)


class ProductViewPayload(BaseModel):
    """Payload for PRODUCT_VIEW events."""

    product_id: str = Field(alias="productId")
    category_id: Optional[str] = Field(default=None, alias="categoryId")
    source: Optional[str] = None  # "search", "category", "recommendation"

    model_config = ConfigDict(populate_by_name=True)


class TrackingEvent(BaseModel):
    """Unified tracking event received from RabbitMQ.

    This is the canonical shape of events published by core-backend.
    """

    model_config = ConfigDict(strict=False)

    event_id: Optional[str] = Field(default=None, alias="eventId")
    user_id: str = Field(alias="userId")
    type: str
    payload: dict
    timestamp: Optional[str] = None

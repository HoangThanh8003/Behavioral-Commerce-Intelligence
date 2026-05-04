# ============================================================
# NexusAI — Feature Engineering Service (MANDATORY LAYER)
# Raw events → Aggregated behavioral features
# ============================================================

import logging
from datetime import datetime, timedelta
from typing import Optional

from config import settings
from db.pgvector_client import get_user_events
from models.features import UserBehavioralFeatures

logger = logging.getLogger(__name__)


def extract_features(user_id: str) -> UserBehavioralFeatures:
    """Extract and aggregate behavioral features from raw events.

    This is the MANDATORY layer between raw events and embedding/classification.
    Skipping this = noisy embeddings = garbage personas.

    Pipeline:
        1. Fetch raw events from DB (last FEATURE_WINDOW_DAYS days)
        2. Aggregate counts and values per event type
        3. Normalize scores to [0.0, 1.0]
        4. Return structured UserBehavioralFeatures
    """
    raw_events = get_user_events(user_id, days=settings.FEATURE_WINDOW_DAYS)

    if not raw_events:
        logger.info("No events found for user %s — returning default features", user_id)
        return UserBehavioralFeatures(user_id=user_id)

    # --- Step 1: Count and aggregate per event type ---
    purchase_count = 0
    total_spend = 0.0
    click_count = 0
    product_view_count = 0
    categories_viewed: set[str] = set()
    purchase_timestamps: list[datetime] = []
    all_timestamps: list[datetime] = []

    for event in raw_events:
        event_type = event.get("type", "")
        payload = event.get("payload", {}) or {}
        timestamp = event.get("timestamp")

        if isinstance(timestamp, datetime):
            all_timestamps.append(timestamp)

        if event_type == "PURCHASE":
            purchase_count += 1
            total_spend += float(payload.get("amount", 0))
            if isinstance(timestamp, datetime):
                purchase_timestamps.append(timestamp)

        elif event_type == "CLICK":
            click_count += 1

        elif event_type == "PRODUCT_VIEW":
            product_view_count += 1
            cat_id = payload.get("categoryId")
            if cat_id:
                categories_viewed.add(cat_id)

    # --- Step 2: Compute derived metrics ---
    avg_order_value = total_spend / purchase_count if purchase_count > 0 else 0.0

    # Purchase frequency: average days between purchases
    purchase_frequency_days = 0.0
    if len(purchase_timestamps) >= 2:
        sorted_ts = sorted(purchase_timestamps)
        intervals = [
            (sorted_ts[i + 1] - sorted_ts[i]).days
            for i in range(len(sorted_ts) - 1)
        ]
        purchase_frequency_days = sum(intervals) / len(intervals) if intervals else 0.0

    # Days since last activity
    days_since_last = 0
    if all_timestamps:
        latest = max(all_timestamps)
        days_since_last = (datetime.utcnow() - latest).days

    total_events = len(raw_events)

    # --- Step 3: Normalize to [0.0, 1.0] with min-max scaling ---
    # These are capped at sensible maximums for normalization
    purchase_intensity = _normalize(purchase_count, max_val=20)
    browsing_intensity = _normalize(product_view_count + click_count, max_val=100)
    engagement_score = _compute_engagement(
        total_events=total_events,
        days_since_last=days_since_last,
        unique_categories=len(categories_viewed),
    )

    features = UserBehavioralFeatures(
        user_id=user_id,
        feat_purchase_count=purchase_count,
        feat_total_spend=total_spend,
        feat_avg_order_value=avg_order_value,
        feat_purchase_frequency_days=purchase_frequency_days,
        feat_click_count=click_count,
        feat_product_view_count=product_view_count,
        feat_unique_categories_viewed=len(categories_viewed),
        feat_avg_session_duration_sec=0.0,  # Not tracked yet
        feat_days_since_last_activity=days_since_last,
        feat_cart_abandonment_rate=0.0,  # Not tracked yet
        feat_total_events=total_events,
        feat_purchase_intensity=purchase_intensity,
        feat_browsing_intensity=browsing_intensity,
        feat_engagement_score=engagement_score,
    )

    logger.info(
        "Features extracted: user=%s, events=%d, purchase_intensity=%.2f, "
        "browsing_intensity=%.2f, engagement=%.2f",
        user_id, total_events, purchase_intensity, browsing_intensity, engagement_score,
    )

    return features


def _normalize(value: float, max_val: float) -> float:
    """Min-max normalize a value to [0.0, 1.0]."""
    if max_val <= 0:
        return 0.0
    return min(value / max_val, 1.0)


def _compute_engagement(
    total_events: int,
    days_since_last: int,
    unique_categories: int,
) -> float:
    """Compute a composite engagement score [0.0, 1.0].

    Factors:
    - Event volume (more events = more engaged)
    - Recency (recent activity = more engaged)
    - Diversity (more categories = more engaged)
    """
    volume_score = _normalize(total_events, max_val=50)
    recency_score = max(0.0, 1.0 - (days_since_last / 30.0))
    diversity_score = _normalize(unique_categories, max_val=10)

    # Weighted composite
    return (volume_score * 0.4) + (recency_score * 0.4) + (diversity_score * 0.2)

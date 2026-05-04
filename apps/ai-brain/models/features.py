# ============================================================
# NexusAI — Behavioral Features Model (MANDATORY LAYER)
# Raw events → Aggregated features → Ready for embedding/classification
# ============================================================

from pydantic import BaseModel, ConfigDict, Field


class UserBehavioralFeatures(BaseModel):
    """Aggregated behavioral features extracted from raw events.

    This is the MANDATORY intermediate layer between raw events and
    embedding generation. Skipping this layer = noisy embeddings = garbage personas.

    All feat_ fields are normalized to [0.0, 1.0] range after aggregation.
    """

    model_config = ConfigDict(strict=True)

    user_id: str

    # --- Purchase Behavior (raw counts) ---
    feat_purchase_count: int = 0
    feat_total_spend: float = 0.0
    feat_avg_order_value: float = 0.0
    feat_purchase_frequency_days: float = 0.0  # avg days between purchases

    # --- Browsing Behavior (raw counts) ---
    feat_click_count: int = 0
    feat_product_view_count: int = 0
    feat_unique_categories_viewed: int = 0
    feat_avg_session_duration_sec: float = 0.0

    # --- Engagement Signals ---
    feat_days_since_last_activity: int = 0
    feat_cart_abandonment_rate: float = 0.0  # carts / orders ratio
    feat_total_events: int = 0

    # --- Normalized Scores (0.0 - 1.0) ---
    feat_purchase_intensity: float = Field(default=0.0, ge=0.0, le=1.0)
    feat_browsing_intensity: float = Field(default=0.0, ge=0.0, le=1.0)
    feat_engagement_score: float = Field(default=0.0, ge=0.0, le=1.0)

    def to_feature_text(self) -> str:
        """Convert features to text representation for embedding generation.

        This text is what gets sent to the embedding model. Structured as
        a natural language description of the user's behavior.
        """
        parts: list[str] = []

        # Purchase behavior
        if self.feat_purchase_count > 0:
            parts.append(
                f"User made {self.feat_purchase_count} purchases "
                f"with average order value of {self.feat_avg_order_value:.2f}"
            )
        else:
            parts.append("User has not made any purchases yet")

        # Browsing behavior
        parts.append(
            f"User viewed {self.feat_product_view_count} products "
            f"across {self.feat_unique_categories_viewed} categories "
            f"with {self.feat_click_count} total clicks"
        )

        # Engagement
        parts.append(
            f"Last activity was {self.feat_days_since_last_activity} days ago"
        )

        # Intensity scores
        parts.append(
            f"Purchase intensity: {self.feat_purchase_intensity:.2f}, "
            f"Browsing intensity: {self.feat_browsing_intensity:.2f}, "
            f"Engagement score: {self.feat_engagement_score:.2f}"
        )

        return ". ".join(parts) + "."

    def to_feature_vector(self) -> list[float]:
        """Convert normalized features to a simple numeric vector.

        Used for rule-based classification weight calculations.
        """
        return [
            self.feat_purchase_intensity,
            self.feat_browsing_intensity,
            self.feat_engagement_score,
            min(self.feat_purchase_count / 20.0, 1.0),
            min(self.feat_product_view_count / 100.0, 1.0),
            min(self.feat_unique_categories_viewed / 10.0, 1.0),
            max(0.0, 1.0 - (self.feat_days_since_last_activity / 30.0)),
            min(self.feat_total_spend / 1000.0, 1.0),
        ]

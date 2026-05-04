# ============================================================
# NexusAI — Persona Rules (Versioned)
# Rule-based persona classification config (MVP mode)
# ============================================================

PERSONA_RULES_V1 = {
    "version": "1.0.0",
    "description": "MVP rule-based persona classification using weighted behavioral features",
    "personas": {
        "IMPULSE_BUYER": {
            "description": "High purchase frequency, low browsing time — buys quickly",
            "weights": {
                "feat_purchase_intensity": 0.7,
                "feat_browsing_intensity": -0.3,
                "feat_engagement_score": 0.2,
            },
            "threshold": 0.6,
        },
        "RESEARCHER": {
            "description": "High browsing, many categories viewed, low purchase rate — compares before buying",
            "weights": {
                "feat_browsing_intensity": 0.6,
                "feat_unique_categories_viewed": 0.3,
                "feat_purchase_intensity": -0.2,
            },
            "threshold": 0.5,
        },
        "LOYAL_CUSTOMER": {
            "description": "Consistent purchases, high engagement, repeat buyer",
            "weights": {
                "feat_purchase_frequency_days": -0.4,  # negative = more frequent = higher score
                "feat_engagement_score": 0.4,
                "feat_total_spend": 0.3,
            },
            "threshold": 0.55,
        },
        "EXPLORER": {
            "description": "Default persona — new users or unclassified behavior",
            "weights": {},
            "threshold": 0.0,  # catch-all fallback
        },
    },
}

# Active rule set — change this to switch versions
ACTIVE_RULES = PERSONA_RULES_V1

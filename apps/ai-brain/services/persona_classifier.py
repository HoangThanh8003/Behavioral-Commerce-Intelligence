# ============================================================
# NexusAI — Persona Classifier Service
# Dual-mode: Rule-Based (MVP) → Vector Similarity (upgrade)
# ============================================================

import logging
from datetime import datetime
from typing import Optional

from config import settings
from db.pgvector_client import (
    get_last_persona_update,
    upsert_user_persona,
)
from models.features import UserBehavioralFeatures
from models.personas import PersonaResult
from rules.persona_rules import ACTIVE_RULES
from services.feature_engineer import extract_features

logger = logging.getLogger(__name__)


def classify_persona(features: UserBehavioralFeatures) -> PersonaResult:
    """Classify a user into a persona based on their behavioral features.

    Supports two modes (controlled by config.PERSONA_MODE):
    - RULE_BASED (MVP): Weighted scoring against predefined rules
    - VECTOR_SIMILARITY: Cosine similarity against cluster centroids (future)

    Args:
        features: Aggregated behavioral features (from feature engineering layer)

    Returns:
        PersonaResult with type, confidence, and per-persona scores
    """
    if settings.PERSONA_MODE == "RULE_BASED":
        return _classify_rule_based(features)

    # Future: vector similarity mode
    logger.warning("VECTOR_SIMILARITY mode not implemented — falling back to RULE_BASED")
    return _classify_rule_based(features)


def classify_user(user_id: str) -> PersonaResult:
    """Full pipeline: extract features → classify → persist.

    This is the main entry point for persona classification.

    Args:
        user_id: The user to classify

    Returns:
        PersonaResult
    """
    # Step 1: Feature Extraction (MANDATORY)
    features = extract_features(user_id)

    # Step 2: Edge case — new users with < 3 events get default persona
    if features.feat_total_events < 3:
        result = PersonaResult(
            user_id=user_id,
            persona_type="EXPLORER",
            confidence=1.0,
            rule_version=ACTIVE_RULES["version"],
            mode=settings.PERSONA_MODE,
            scores={"EXPLORER": 1.0},
        )
        _persist_result(result)
        return result

    # Step 3: Classify
    result = classify_persona(features)

    # Step 4: Persist to DB
    _persist_result(result)

    return result


async def should_recompute(user_id: str, event_type: str) -> bool:
    """Determine if persona needs immediate recompute.

    Triggers:
    - PURCHASE events always trigger recompute
    - Any event triggers if persona was never computed
    - Any event triggers if last computation was > 24h ago
    """
    SIGNIFICANT_EVENTS = {"PURCHASE"}
    if event_type in SIGNIFICANT_EVENTS:
        return True

    last_computed = get_last_persona_update(user_id)
    if last_computed is None:
        return True  # Never computed

    hours_since = (datetime.utcnow() - last_computed).total_seconds() / 3600
    return hours_since >= 24  # Recompute if stale > 24h


def _classify_rule_based(features: UserBehavioralFeatures) -> PersonaResult:
    """Rule-based classification using weighted feature scoring.

    For each persona, compute a weighted score from the user's features.
    The persona with the highest score above its threshold wins.
    If no persona exceeds its threshold, assign EXPLORER (catch-all).
    """
    rules = ACTIVE_RULES
    scores: dict[str, float] = {}

    feature_dict = {
        "feat_purchase_intensity": features.feat_purchase_intensity,
        "feat_browsing_intensity": features.feat_browsing_intensity,
        "feat_engagement_score": features.feat_engagement_score,
        "feat_unique_categories_viewed": min(features.feat_unique_categories_viewed / 10.0, 1.0),
        "feat_purchase_frequency_days": min(features.feat_purchase_frequency_days / 30.0, 1.0),
        "feat_total_spend": min(features.feat_total_spend / 1000.0, 1.0),
    }

    for persona_name, persona_config in rules["personas"].items():
        weights = persona_config.get("weights", {})
        if not weights:
            scores[persona_name] = 0.0
            continue

        score = 0.0
        for feat_name, weight in weights.items():
            feat_value = feature_dict.get(feat_name, 0.0)
            score += feat_value * weight

        # Clamp to [0.0, 1.0]
        scores[persona_name] = max(0.0, min(score, 1.0))

    # Find best persona above threshold
    best_persona = "EXPLORER"
    best_score = 0.0

    for persona_name, persona_config in rules["personas"].items():
        threshold = persona_config.get("threshold", 0.0)
        persona_score = scores.get(persona_name, 0.0)

        if persona_score >= threshold and persona_score > best_score:
            best_persona = persona_name
            best_score = persona_score

    # Confidence = how much the score exceeds the threshold
    threshold = rules["personas"][best_persona].get("threshold", 0.0)
    confidence = min((best_score - threshold + 0.5), 1.0) if best_score > 0 else 0.5

    result = PersonaResult(
        user_id=features.user_id,
        persona_type=best_persona,
        confidence=round(confidence, 3),
        rule_version=rules["version"],
        mode="RULE_BASED",
        scores={k: round(v, 3) for k, v in scores.items()},
    )

    logger.info(
        "Persona classified: user=%s, type=%s, confidence=%.3f, scores=%s",
        features.user_id, best_persona, confidence, scores,
    )

    return result


def _persist_result(result: PersonaResult) -> None:
    """Persist classification result to the database."""
    try:
        upsert_user_persona(
            user_id=result.user_id,
            persona_type=result.persona_type,
            traits={
                "scores": result.scores,
                "mode": result.mode,
            },
            confidence=result.confidence,
            rule_version=result.rule_version,
        )
    except Exception as e:
        logger.error("Failed to persist persona for user %s: %s", result.user_id, e)

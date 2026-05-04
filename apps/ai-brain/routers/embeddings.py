# ============================================================
# NexusAI — Embeddings Router
# Generate and store product embeddings via pgvector
# ============================================================

import asyncio
import logging

from fastapi import APIRouter, HTTPException

from config import settings
from db.pgvector_client import get_product_for_embedding, store_product_embedding
from models.personas import (
    EmbeddingBatchRequest,
    EmbeddingRequest,
    EmbeddingResponse,
)
from services.embedding_service import generate_product_embedding

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/embeddings", tags=["Embeddings"])


@router.post("/generate", response_model=EmbeddingResponse)
async def generate_embedding(request: EmbeddingRequest) -> EmbeddingResponse:
    """Generate and store an embedding for a single product.

    Fetches product details from DB, generates embedding vector,
    and stores it in the Product.vector column via pgvector.
    """
    # Get product data for embedding
    product = get_product_for_embedding(request.product_id)

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    try:
        embedding = generate_product_embedding(
            name=product["name"],
            description=product.get("description"),
            category_name=product.get("category_name"),
        )

        store_product_embedding(request.product_id, embedding)

        return EmbeddingResponse(
            product_id=request.product_id,
            dimensions=len(embedding),
            stored=True,
            message=f"Embedding generated and stored ({settings.EMBEDDING_MODE} mode)",
        )
    except Exception as e:
        logger.error("Embedding generation failed for product %s: %s", request.product_id, e)
        raise HTTPException(status_code=500, detail=f"Embedding generation failed: {str(e)}")


@router.post("/batch")
async def generate_batch(request: EmbeddingBatchRequest) -> dict:
    """Generate embeddings for multiple products in batches.

    Batch size is limited to BATCH_SIZE (default 5) for MacBook 2017 optimization.
    Includes throttle delay between batches.
    """
    results: list[dict] = []
    errors: list[dict] = []

    items = request.items

    for i in range(0, len(items), settings.BATCH_SIZE):
        batch = items[i : i + settings.BATCH_SIZE]

        for item in batch:
            try:
                product = get_product_for_embedding(item.product_id)
                if product is None:
                    errors.append({
                        "product_id": item.product_id,
                        "error": "Product not found",
                    })
                    continue

                embedding = generate_product_embedding(
                    name=product["name"],
                    description=product.get("description"),
                    category_name=product.get("category_name"),
                )
                store_product_embedding(item.product_id, embedding)

                results.append({
                    "product_id": item.product_id,
                    "dimensions": len(embedding),
                    "stored": True,
                })
            except Exception as e:
                errors.append({
                    "product_id": item.product_id,
                    "error": str(e),
                })

        # Throttle between batches (MacBook 2017 optimization)
        if i + settings.BATCH_SIZE < len(items):
            await asyncio.sleep(settings.THROTTLE_DELAY_SEC)

    return {
        "status": "completed",
        "total_processed": len(results),
        "total_errors": len(errors),
        "results": results,
        "errors": errors,
    }

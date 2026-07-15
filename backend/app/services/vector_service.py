from uuid import uuid4

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    PointStruct,
    VectorParams,
    PayloadSchemaType,
)
from app.core.config import settings
from qdrant_client.models import Filter, FieldCondition, MatchValue

class VectorService:
    def __init__(self):
        self.client = QdrantClient(
            url=settings.QDRANT_URL,
            api_key=settings.QDRANT_API_KEY,
        )

        self._create_collection()

    def _create_collection(self):
        if not self.client.collection_exists(settings.QDRANT_COLLECTION):
            self.client.create_collection(
                collection_name=settings.QDRANT_COLLECTION,
                vectors_config=VectorParams(
                    size=384,
                    distance=Distance.COSINE,
                ),
            )

        # Create payload indexes (safe to call multiple times)
        try:
            self.client.create_payload_index(
                collection_name=settings.QDRANT_COLLECTION,
                field_name="user_id",
                field_schema=PayloadSchemaType.KEYWORD,
            )
        except Exception:
            pass

        try:
            self.client.create_payload_index(
                collection_name=settings.QDRANT_COLLECTION,
                field_name="document_id",
                field_schema=PayloadSchemaType.KEYWORD,
            )
        except Exception:
            pass
        
    async def store_embeddings(
        self,
        document_id: str,
        document_name: str,
        document_type: str | None,
        user_id: str,
        embeddings: list[list[float]],
        chunks: list[str],
    ) -> None:
        points = []

        for index, (embedding, chunk) in enumerate(zip(embeddings, chunks)):
            points.append(
                PointStruct(
                    id=str(uuid4()),
                    vector=embedding,
                    payload={
                        "document_id": document_id,
                        "user_id": user_id,
                        "document_name": document_name,
                        "chunk_index": index,
                        "text": chunk,
                        "document_type": document_type,
                    },
                )
            )

        self.client.upsert(
            collection_name=settings.QDRANT_COLLECTION,
            points=points,
        )
        
    async def delete_document_embeddings(
        self,
        document_id: str,
    ) -> None:
        self.client.delete(
            collection_name=settings.QDRANT_COLLECTION,
            points_selector=Filter(
                must=[
                    FieldCondition(
                        key="document_id",
                        match=MatchValue(value=document_id),
                    )
                ]
            ),
        )


vector_service = VectorService()
from qdrant_client.models import Filter, FieldCondition, MatchValue
from app.core.config import settings
from app.services.embedding_service import embedding_service
from app.services.vector_service import vector_service


class SearchService:
    async def search(
        self,
        query: str,
        user_id: str,
        document_id: str | None = None,
        limit: int = 5,
    ) -> list[dict]:
        embedding = await embedding_service.generate_embedding(query)
        conditions = [
            FieldCondition(
                key="user_id",
                match=MatchValue(value=user_id),
            )
        ]

        if document_id:
            conditions.append(
                FieldCondition(
                    key="document_id",
                    match=MatchValue(value=document_id),
                )
            )
        results = vector_service.client.query_points(
            collection_name=settings.QDRANT_COLLECTION,
            query=embedding,
            query_filter=Filter(
                must=conditions
            ),
            limit=limit,
        )

        return [
            point.payload
            for point in results.points
        ]


search_service = SearchService()
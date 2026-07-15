from huggingface_hub import InferenceClient

from app.core.config import settings


class EmbeddingService:
    def __init__(self):
        self.client = InferenceClient(
            provider="hf-inference",
            api_key=settings.HUGGINGFACE_API_KEY,
        )

    async def generate_embedding(
        self,
        text: str,
    ) -> list[float]:
        embedding = self.client.feature_extraction(
            text[:4000],
            model=settings.HUGGINGFACE_EMBEDDING_MODEL,
        )

        if hasattr(embedding, "tolist"):
            embedding = embedding.tolist()

        if isinstance(embedding[0], list):
            return embedding[0]

        return embedding

    async def generate_embeddings(
        self,
        chunks: list[str],
    ) -> list[list[float]]:
        embeddings = []

        for chunk in chunks:
            embeddings.append(
                await self.generate_embedding(chunk)
            )

        return embeddings


embedding_service = EmbeddingService()
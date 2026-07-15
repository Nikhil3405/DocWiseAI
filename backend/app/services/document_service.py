from uuid import UUID

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Document
from app.services.storage_service import storage_service
from app.services.vector_service import vector_service

class DocumentService:
    async def get_documents(
        self,
        db: AsyncSession,
        user_id: UUID,
    ) -> list[Document]:
        result = await db.execute(
            select(Document)
            .where(Document.user_id == user_id)
            .order_by(Document.created_at.desc())
        )

        return result.scalars().all()

    async def get_document(
        self,
        db: AsyncSession,
        document_id: UUID,
        user_id: UUID,
    ) -> Document | None:
        result = await db.execute(
            select(Document).where(
                Document.id == document_id,
                Document.user_id == user_id,
            )
        )

        return result.scalar_one_or_none()

    async def toggle_favorite(
        self,
        db: AsyncSession,
        document: Document,
    ) -> Document:
        document.is_favorite = not document.is_favorite

        await db.commit()
        await db.refresh(document)

        return document

    async def delete_document(
        self,
        db: AsyncSession,
        document: Document,
    ) -> None:
        storage_service.delete_file(
            document.storage_path,
        )

        await vector_service.delete_document_embeddings(
            str(document.id),
        )

        await db.delete(document)
        await db.commit()


document_service = DocumentService()
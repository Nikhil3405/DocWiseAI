from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Document, DocumentStatus


class DashboardService:
    async def get_dashboard(
        self,
        db: AsyncSession,
        user_id,
    ):
        total_documents = await db.scalar(
            select(func.count())
            .select_from(Document)
            .where(Document.user_id == user_id)
        )

        processing_documents = await db.scalar(
            select(func.count())
            .select_from(Document)
            .where(
                Document.user_id == user_id,
                Document.status == DocumentStatus.PROCESSING,
            )
        )

        favorite_documents = await db.scalar(
            select(func.count())
            .select_from(Document)
            .where(
                Document.user_id == user_id,
                Document.is_favorite.is_(True),
            )
        )

        storage_used = await db.scalar(
            select(func.coalesce(func.sum(Document.file_size), 0))
            .where(Document.user_id == user_id)
        )

        result = await db.execute(
            select(
                Document.document_type,
                func.count(Document.id),
            )
            .where(Document.user_id == user_id)
            .group_by(Document.document_type)
        )

        documents_by_type = [
            {
                "document_type": row[0] or "Others",
                "count": row[1],
            }
            for row in result.all()
        ]

        recent_result = await db.execute(
            select(Document)
            .where(Document.user_id == user_id)
            .order_by(Document.created_at.desc())
            .limit(5)
        )

        recent_documents = recent_result.scalars().all()

        expiry_result = await db.execute(
            select(Document)
            .where(
                Document.user_id == user_id,
                Document.expiry_date.is_not(None),
                Document.expiry_date >= datetime.utcnow(),
            )
            .order_by(Document.expiry_date)
            .limit(5)
        )

        expiring_documents = expiry_result.scalars().all()

        return {
            "total_documents": total_documents or 0,
            "processing_documents": processing_documents or 0,
            "favorite_documents": favorite_documents or 0,
            "storage_used": storage_used or 0,
            "documents_by_type": documents_by_type,
            "recent_documents": recent_documents,
            "expiring_documents": expiring_documents,
        }


dashboard_service = DashboardService()
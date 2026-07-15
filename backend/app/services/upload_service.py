from pathlib import Path
from uuid import UUID

from fastapi import BackgroundTasks, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.document import Document, DocumentStatus
from app.schemas.upload import UploadResponse
from app.services.document_processing_service import (
    document_processing_service,
)
from app.services.storage_service import storage_service
from app.utils.file_validator import FileValidator


class UploadService:
    async def upload_document(
    self,
    db: AsyncSession,
    background_tasks: BackgroundTasks,
    user_id: UUID,
    file: UploadFile,
) -> UploadResponse:
        await FileValidator.validate(file)

        upload_result = await storage_service.upload_file(
            str(user_id),
            file,
        )

        document = Document(
            user_id=user_id,
            original_file_name=file.filename or "untitled",
            storage_bucket=storage_service.bucket,
            storage_path=upload_result.storage_path,
            mime_type=file.content_type or "application/octet-stream",
            file_size=upload_result.file_size,
            status=DocumentStatus.PROCESSING,
        )

        try:
            db.add(document)
            await db.commit()
            await db.refresh(document)
        except Exception:
            await db.rollback()
            raise

        background_tasks.add_task(
            document_processing_service.process_document,
            str(document.id),
        )

        return UploadResponse(
            id=document.id,
            original_file_name=document.original_file_name,
            status=document.status,
            message="Document uploaded successfully. AI processing has started.",
        )

upload_service = UploadService()
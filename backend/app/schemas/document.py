from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.document import DocumentStatus


class DocumentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    original_file_name: str
    storage_bucket: str
    storage_path: str
    mime_type: str
    file_size: int
    page_count: int | None
    document_type: str | None
    status: DocumentStatus
    processing_message: str | None
    ai_summary: str | None
    document_metadata: dict | None
    tags: list[str] | None
    expiry_date: datetime | None
    is_favorite: bool
    created_at: datetime
    updated_at: datetime


class DocumentListResponse(BaseModel):
    items: list[DocumentResponse]
    total: int


class ToggleFavoriteResponse(BaseModel):
    message: str
    is_favorite: bool
    
class DocumentDownloadResponse(BaseModel):
    url: str
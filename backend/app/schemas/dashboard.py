from pydantic import BaseModel

from app.schemas.document import DocumentResponse


class DocumentTypeCount(BaseModel):
    document_type: str
    count: int


class DashboardResponse(BaseModel):
    total_documents: int
    processing_documents: int
    favorite_documents: int
    storage_used: int
    documents_by_type: list[DocumentTypeCount]
    recent_documents: list[DocumentResponse]
    expiring_documents: list[DocumentResponse]
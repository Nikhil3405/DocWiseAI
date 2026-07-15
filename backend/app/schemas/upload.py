from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.document import DocumentStatus


class UploadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    original_file_name: str
    status: DocumentStatus
    message: str
    

class StorageUploadResult(BaseModel):
    storage_path: str
    file_size: int
    
class TextExtractionResult(BaseModel):
    text: str
    page_count: int
    requires_ocr: bool
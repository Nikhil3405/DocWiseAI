from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.message import MessageRole


class Citation(BaseModel):
    document_id: UUID
    document_name: str
    page: int | None = None
    excerpt: str | None = None


class MessageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    conversation_id: UUID
    role: MessageRole
    content: str
    citations: list[Citation] | None
    created_at: datetime
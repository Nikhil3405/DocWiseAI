from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import JSON, Boolean, DateTime, Enum, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Column
from app.core.database import Base

if TYPE_CHECKING:
    from app.models.collection_document import CollectionDocument



class DocumentStatus(str, enum.Enum):
    PROCESSING = "PROCESSING"
    UPLOADING = "UPLOADING"
    EXTRACTING_TEXT = "EXTRACTING_TEXT"
    GENERATING_SUMMARY = "GENERATING_SUMMARY"
    GENERATING_EMBEDDINGS = "GENERATING_EMBEDDINGS"
    READY = "READY"
    FAILED = "FAILED"


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        nullable=False,
        index=True,
    )

    original_file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    storage_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
        unique=True,
    )

    mime_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    page_count: Mapped[int | None] = mapped_column(Integer)

    document_type: Mapped[str | None] = mapped_column(
        String(100),
    )

    status: Mapped[DocumentStatus] = mapped_column(
        Enum(DocumentStatus),
        default=DocumentStatus.PROCESSING,
        nullable=False,
    )

    processing_message: Mapped[str | None] = mapped_column(Text)

    extracted_text: Mapped[str | None] = mapped_column(Text)

    ai_summary: Mapped[str | None] = mapped_column(Text)

    document_metadata: Mapped[dict | None] = mapped_column(JSON)

    tags: Mapped[list[str] | None] = mapped_column(JSON)

    expiry_date: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True)
    )

    is_favorite: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    collection_documents: Mapped[list["CollectionDocument"]] = relationship(
        back_populates="document",
        cascade="all, delete-orphan",
    )

    collections = association_proxy(
        "collection_documents",
        "collection",
    )
    processing_error = Column(
        Text,
        nullable=True,
    )
    
    storage_bucket: Mapped[str] = mapped_column(
        String(100),
        default="documents",
        nullable=False,
    )
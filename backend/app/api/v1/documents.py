from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.services.storage_service import storage_service
from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.document import (
    DocumentListResponse,
    DocumentResponse,
    ToggleFavoriteResponse,
    DocumentDownloadResponse,
)
from app.services.document_service import document_service

router = APIRouter()


@router.get("/", response_model=DocumentListResponse)
async def get_documents(
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    documents = await document_service.get_documents(
        db,
        current_user.id,
    )

    return {
        "items": documents,
        "total": len(documents),
    }


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = await document_service.get_document(
        db,
        document_id,
        current_user.id,
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    return document


@router.patch("/{document_id}/favorite", response_model=ToggleFavoriteResponse)
async def toggle_favorite(
    document_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = await document_service.get_document(
        db,
        document_id,
        current_user.id,
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    document = await document_service.toggle_favorite(
        db,
        document,
    )

    return {
        "message": "Favorite updated successfully.",
        "is_favorite": document.is_favorite,
    }


@router.delete("/{document_id}")
async def delete_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = await document_service.get_document(
        db,
        document_id,
        current_user.id,
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    await document_service.delete_document(
        db,
        document,
    )

    return {
        "message": "Document deleted successfully.",
    }
    
@router.get("/{document_id}/download",response_model=DocumentDownloadResponse,)
async def download_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = await document_service.get_document(
        db,
        document_id,
        current_user.id,
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    signed_url = storage_service.create_signed_url(
        document.storage_path
    )

    return {
        "url": signed_url,
    }
    
@router.get("/{document_id}/preview",response_model=DocumentDownloadResponse,)
async def preview_document(
    document_id: UUID,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = await document_service.get_document(
        db,
        document_id,
        current_user.id,
    )

    if document is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found.",
        )

    preview_url = storage_service.create_signed_url(
        document.storage_path
    )

    return {
        "url": preview_url,
    }
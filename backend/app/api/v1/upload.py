from fastapi import APIRouter, BackgroundTasks, Depends, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.dependencies.auth import get_current_user
from app.schemas.upload import UploadResponse
from app.services.upload_service import upload_service

router = APIRouter()

# from uuid import UUID

# TEST_USER_ID = UUID("ae6844e9-de6d-4a21-a626-049ad2933c88")

@router.post("/", response_model=UploadResponse)
async def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await upload_service.upload_document(
        db=db,
        background_tasks=background_tasks,
        user_id=current_user.id,
        file=file,
    )

# @router.post("/")
# async def upload_document(
#     background_tasks: BackgroundTasks,
#     file: UploadFile = File(...),
#     db: AsyncSession = Depends(get_db),
# ):
#     return await upload_service.upload_document(
#         db=db,
#         background_tasks=background_tasks,
#         user_id=TEST_USER_ID,
#         file=file,
#     )
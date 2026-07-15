from fastapi import APIRouter, Depends

from app.dependencies.auth import get_current_user
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

router = APIRouter()


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    current_user=Depends(get_current_user),
):
    return await chat_service.ask(
        question=request.question,
        user_id=current_user.id,
        document_id=request.document_id,
    )
from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    document_id: str | None = None


class Citation(BaseModel):
    document_id: str
    document_name: str


class ChatResponse(BaseModel):
    answer: str
    citations: list[Citation]
from fastapi import APIRouter
from app.api.v1 import upload, chat, dashboard, documents

api_router = APIRouter()

api_router.include_router(
    upload.router,
    prefix="/upload",
    tags=["Upload"],
)

api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"],
)

api_router.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"],
)

api_router.include_router(
    documents.router,
    prefix="/documents",
    tags=["Documents"],
)

# api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
# api_router.include_router(upload.router, prefix="/upload", tags=["Upload"])
# api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])
# api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])
# api_router.include_router(search.router, prefix="/search", tags=["Search"])
# api_router.include_router(collections.router, prefix="/collections", tags=["Collections"])
# api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
# api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
from functools import lru_cache
from typing import Literal
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    APP_NAME: str = "DocWiseAI"
    APP_ENV: Literal[
        "development",
        "production",
        "testing"
    ] = "development"
    APP_DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    DATABASE_URL: str

    SUPABASE_URL: str
    SUPABASE_ANON_KEY: str
    SUPABASE_SERVICE_ROLE_KEY: str
    SUPABASE_STORAGE_BUCKET: str = "documents"
    
    GROQ_API_KEY: str
    GROQ_MODEL: str = "llama-3.3-70b-versatile"

    HUGGINGFACE_API_KEY: str
    HUGGINGFACE_EMBEDDING_MODEL: str = (
        "BAAI/bge-small-en-v1.5"
    )
    
    GOOGLE_VISION_API_KEY: str

    QDRANT_URL: str
    QDRANT_API_KEY: str
    QDRANT_COLLECTION: str = "documents"

    MAX_PDF_SIZE_MB: int = 25
    MAX_IMAGE_SIZE_MB: int = 10
    MAX_DOCX_SIZE_MB: int = 15

    MAX_PDF_PAGES: int = 100
    MAX_TEXT_LENGTH: int = 250000
    MAX_CHUNKS: int = 200
    MIN_EXTRACTED_TEXT_LENGTH: int = 100
    
    FRONTEND_URL: str = "http://localhost:3000"


@lru_cache
def get_settings() -> Settings:
    """
    Returns a cached Settings instance.

    Environment variables are loaded only once during
    application startup.
    """
    return Settings()


settings = get_settings()
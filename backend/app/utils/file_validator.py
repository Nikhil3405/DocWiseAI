from pathlib import Path

from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


class FileValidator:
    ALLOWED_EXTENSIONS = {
        ".pdf",
        ".docx",
        ".jpg",
        ".jpeg",
        ".png",
    }

    IMAGE_EXTENSIONS = {
        ".jpg",
        ".jpeg",
        ".png",
    }

    @classmethod
    async def validate(cls, file: UploadFile) -> None:
        extension = Path(file.filename).suffix.lower()

        if extension not in cls.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type.",
            )

        content = await file.read()
        file_size = len(content)
        await file.seek(0)

        max_size = cls._get_max_size(extension)

        if file_size > max_size:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Maximum allowed file size is {max_size // (1024 * 1024)} MB.",
            )

    @classmethod
    def _get_max_size(cls, extension: str) -> int:
        if extension == ".pdf":
            return settings.MAX_PDF_SIZE_MB * 1024 * 1024

        if extension == ".docx":
            return settings.MAX_DOCX_SIZE_MB * 1024 * 1024

        if extension in cls.IMAGE_EXTENSIONS:
            return settings.MAX_IMAGE_SIZE_MB * 1024 * 1024

        return 0
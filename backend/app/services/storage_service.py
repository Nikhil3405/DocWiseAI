from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from supabase import Client, create_client

from app.core.config import settings
from app.schemas.upload import StorageUploadResult

import tempfile
from pathlib import Path

class StorageService:
    def __init__(self) -> None:
        self.client: Client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_ROLE_KEY,
        )
        self.bucket = settings.SUPABASE_STORAGE_BUCKET

    async def upload_file(
        self,
        user_id: str,
        file: UploadFile,
    ) -> str:
        extension = Path(file.filename).suffix
        file_path = f"{user_id}/{uuid4()}{extension}"

        content = await file.read()

        self.client.storage.from_(self.bucket).upload(
            path=file_path,
            file=content,
            file_options={
                "content-type": file.content_type,
                "upsert": "false",
            },
        )

        await file.seek(0)

        return StorageUploadResult(
            storage_path=file_path,
            file_size=len(content),
        )
        
    def delete_file(
        self,
        file_path: str,
    ) -> None:
        self.client.storage.from_(self.bucket).remove([file_path])

    def get_public_url(
        self,
        file_path: str,
    ) -> str:
        return self.client.storage.from_(self.bucket).get_public_url(
            file_path
        )
    def delete_temp_file(
        self,
        file_path: str,
    ) -> None:
        path = Path(file_path)

        if path.exists():
            path.unlink()
            
    async def download_file(
        self,
        storage_path: str,
    ) -> str:
        file_bytes = self.client.storage.from_(self.bucket).download(
            storage_path
        )

        suffix = Path(storage_path).suffix

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix,
        ) as temp_file:
            temp_file.write(file_bytes)
            return temp_file.name
        
    def create_signed_url(
        self,
        storage_path: str,
        expires_in: int = 300,
    ) -> str:
        response = self.client.storage.from_(self.bucket).create_signed_url(
            path=storage_path,
            expires_in=expires_in,
        )

        return response["signedURL"]
    

storage_service = StorageService()
import base64
from io import BytesIO
from pathlib import Path

import fitz
import httpx

from app.core.config import settings


class OCRService:
    GOOGLE_VISION_URL = (
        "https://vision.googleapis.com/v1/images:annotate"
    )

    async def extract_text(
        self,
        file_path: str,
    ) -> str:
        extension = Path(file_path).suffix.lower()

        if extension == ".pdf":
            return await self._extract_pdf(file_path)

        return await self._extract_image(file_path)

    async def _extract_pdf(
        self,
        file_path: str,
    ) -> str:
        document = fitz.open(file_path)

        pages = []

        for page in document:
            pix = page.get_pixmap(dpi=300)

            image = BytesIO(pix.tobytes("png"))

            pages.append(
                await self._vision_request(image.getvalue())
            )

        document.close()

        return "\n".join(pages)

    async def _extract_image(
        self,
        file_path: str,
    ) -> str:
        with open(file_path, "rb") as file:
            return await self._vision_request(file.read())

    async def _vision_request(
        self,
        image_bytes: bytes,
    ) -> str:
        image = base64.b64encode(image_bytes).decode()

        payload = {
            "requests": [
                {
                    "image": {
                        "content": image,
                    },
                    "features": [
                        {
                            "type": "DOCUMENT_TEXT_DETECTION"
                        }
                    ],
                }
            ]
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(
                f"{self.GOOGLE_VISION_URL}?key={settings.GOOGLE_VISION_API_KEY}",
                json=payload,
            )

        # response.raise_for_status()
        if response.status_code != 200:
            print("Status:", response.status_code)
            print("Response:", response.text)
            response.raise_for_status()
        data = response.json()

        annotations = (
            data.get("responses", [{}])[0]
            .get("textAnnotations", [])
        )

        if not annotations:
            return ""

        return annotations[0]["description"]


ocr_service = OCRService()
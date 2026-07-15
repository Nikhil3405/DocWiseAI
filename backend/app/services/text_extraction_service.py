from pathlib import Path

import fitz
from docx import Document

from app.schemas.upload import TextExtractionResult


class TextExtractionService:
    async def extract_text(
        self,
        file_path: str,
    ) -> TextExtractionResult:
        extension = Path(file_path).suffix.lower()

        if extension == ".pdf":
            return self._extract_pdf(file_path)

        if extension == ".docx":
            return self._extract_docx(file_path)

        return TextExtractionResult(
            text="",
            page_count=0,
            requires_ocr=True,
        )

    def _extract_pdf(
        self,
        file_path: str,
    ) -> TextExtractionResult:
        document = fitz.open(file_path)

        text = []
        page_count = document.page_count

        for page in document:
            text.append(page.get_text())

        document.close()

        return TextExtractionResult(
            text="\n".join(text).strip(),
            page_count=page_count,
            requires_ocr=True,
        )

    def _extract_docx(
        self,
        file_path: str,
    ) -> TextExtractionResult:
        document = Document(file_path)

        extracted_text = "\n".join(
            paragraph.text
            for paragraph in document.paragraphs
        ).strip()

        return TextExtractionResult(
            text=extracted_text,
            page_count=1,
            requires_ocr=False,
        )


text_extraction_service = TextExtractionService()
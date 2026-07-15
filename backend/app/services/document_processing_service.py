from uuid import UUID

from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.document import Document, DocumentStatus
from app.services.ocr_service import ocr_service
from app.services.storage_service import storage_service
from app.services.text_extraction_service import text_extraction_service
from app.services.embedding_service import embedding_service
from app.services.llm_service import llm_service
from app.services.vector_service import vector_service
from datetime import datetime
from app.utils.text_chunker import text_chunker



class DocumentProcessingService:
    async def process_document(
        self,
        document_id: str,
    ) -> None:
        async with AsyncSessionLocal() as db:
            temp_file = None

            try:
                result = await db.execute(
                    select(Document).where(
                        Document.id == UUID(document_id)
                    )
                )

                document = result.scalar_one_or_none()

                if document is None:
                    return

                temp_file = await storage_service.download_file(
                    document.storage_path
                )
                document.status = DocumentStatus.EXTRACTING_TEXT
                await db.commit()
                await db.refresh(document)

                # Extract text
                text_result = await text_extraction_service.extract_text(
                    temp_file
                )

                page_count = text_result.page_count

                if text_result.requires_ocr:
                    ocr_text = await ocr_service.extract_text(
                        temp_file
                    )

                    pdf_words = len(text_result.text.split())
                    ocr_words = len(ocr_text.split())

                    if ocr_words > pdf_words:
                        extracted_text = ocr_text
                    else:
                        extracted_text = text_result.text
                else:
                    extracted_text = text_result.text
                document.status = DocumentStatus.GENERATING_SUMMARY
                await db.commit()
                await db.refresh(document)

                # Generate summary
                analysis = await llm_service.analyze_document(
                    extracted_text
                )

                document.document_type = analysis.get("document_type")

                document.ai_summary = analysis.get("summary")

                document.tags = analysis.get("tags")

                document.document_metadata = analysis.get("metadata")

                expiry = analysis.get("expiry_date")

                if expiry:
                    document.expiry_date = datetime.fromisoformat(expiry)
                    
                document.extracted_text = extracted_text
                document.page_count = page_count

                chunks = text_chunker.chunk_text(
                    extracted_text
                )
                document.status = DocumentStatus.GENERATING_EMBEDDINGS
                await db.commit()
                await db.refresh(document)

                # Generate embeddings
                embeddings = await embedding_service.generate_embeddings(
                    chunks
                )

                await vector_service.store_embeddings(
                    document_id=str(document.id),
                    document_name=document.original_file_name,
                    document_type=document.document_type,
                    user_id=str(document.user_id),
                    embeddings=embeddings,
                    chunks=chunks,
                )

                document.status = DocumentStatus.READY
                document.processing_error = None

                await db.commit()
                await db.refresh(document)

            except Exception as e:
                await db.rollback()

                if "document" in locals() and document is not None:
           
                    document.status = DocumentStatus.FAILED
                    document.processing_error = str(e)

                    await db.commit()
                    await db.refresh(document)

            finally:
                if temp_file:
                    storage_service.delete_temp_file(temp_file)


document_processing_service = DocumentProcessingService()
import asyncio

from app.services.embedding_service import embedding_service
from app.services.llm_service import llm_service
from app.services.ocr_service import ocr_service
from app.utils.text_chunker import text_chunker


async def main():
    file_path = "C:\\Users\\MAC\\Documents\\aadhar_nikhil.pdf"

    print("=" * 80)
    print("OCR")
    print("=" * 80)

    text = await ocr_service.extract_text(file_path)

    print(text[:1000])

    print("\n")
    print("=" * 80)
    print("LLM")
    print("=" * 80)

    analysis = await llm_service.analyze_document(text)

    print(analysis)

    print("\n")
    print("=" * 80)
    print("CHUNKS")
    print("=" * 80)

    chunks = text_chunker.chunk_text(text)

    print(f"Chunks: {len(chunks)}")

    print("\n")
    print("=" * 80)
    print("EMBEDDING")
    print("=" * 80)

    embedding = await embedding_service.generate_embedding(chunks[0])

    print(f"Embedding Dimension: {len(embedding)}")


if __name__ == "__main__":
    asyncio.run(main())
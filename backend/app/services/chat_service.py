from app.services.llm_service import llm_service
from app.services.search_service import search_service


class ChatService:
    async def ask(
        self,
        question: str,
        user_id: str,
        document_id: str | None = None,
    ):
        
        results = await search_service.search(
            query=question,
            user_id=user_id,
            document_id=document_id,
        )

        if not results:
            return {
                "answer": "I couldn't find any relevant documents.",
                "citations": [],
            }

        context = "\n\n".join(
            chunk["text"]
            for chunk in results
        )

        answer = await llm_service.answer_question(
            question,
            context,
        )

        seen = set()
        citations = []

        for chunk in results:
            doc_id = chunk["document_id"]

            if doc_id in seen:
                continue

            seen.add(doc_id)

            citations.append({
                "document_id": doc_id,
                "document_name": chunk["document_name"],
            })

        return {
            "answer": answer,
            "citations": citations,
        }


chat_service = ChatService()
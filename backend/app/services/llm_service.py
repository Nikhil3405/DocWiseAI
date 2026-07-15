import json

from groq import Groq

from app.core.config import settings


class LLMService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)

    async def analyze_document(
        self,
        text: str,
    ) -> dict:
        prompt = f"""
You are DocWiseAI, an AI specialized in document analysis.

Analyze the document and return ONLY valid JSON.

Rules:
- Do not include markdown.
- Do not include explanations.
- If a value is unavailable, use null.
- Keep document_type short (e.g. Passport, Aadhaar, PAN, Certificate, Bank Statement, Driving License, Insurance, Medical, Bill, Employment, Property, Vehicle, Travel, Education, Others).
- Generate a concise summary in one or two sentences.
- Normalize all dates to YYYY-MM-DD whenever possible.
- Generate 3 to 8 meaningful tags.
- Preserve extracted values exactly as they appear in the document.
- If you cannot identify the document type, use "Others" as the document_type.
Return this JSON schema exactly:

{{
    "document_type": "",
    "summary": "",
    "expiry_date": null,
    "tags": [],
    "metadata": {{}}
}}

Document:

{text[:12000]}
"""

        response = self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0,
            response_format={"type": "json_object"},
        )

        return json.loads(response.choices[0].message.content)

    async def answer_question(
        self,
        question: str,
        context: str,
    ) -> str:
        prompt = f"""
You are DocWiseAI.

Answer the user's question ONLY using the provided document context.

Rules:
- Do not make up information.
- If the answer is not present, reply exactly:
"I couldn't find that information in your uploaded documents."
- Keep the answer concise and accurate.
- If multiple documents contain the answer, mention all relevant information.

Document Context:

{context}

User Question:

{question}
"""

        response = self.client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            temperature=0,
        )

        return response.choices[0].message.content.strip()


llm_service = LLMService()
from fastapi import APIRouter
from pydantic import BaseModel

from services.vector_store import retrieve_context_with_sources
from services.llm_service import generate_answer

router = APIRouter()


class QuestionRequest(BaseModel):
    question: str
    book_name: str | None = None
    mode: str = "depth"


@router.post("/chat")
def ask_question(data: QuestionRequest):

    context, sources = retrieve_context_with_sources(
        data.question,
        data.book_name
    )

    answer = generate_answer(
        data.question,
        context,
        data.mode
    )

    return {
        "answer": answer,
        "sources": sources
    }
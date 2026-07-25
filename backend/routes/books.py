from fastapi import APIRouter, HTTPException
import os

from services.vector_store import (
    get_all_books,
    delete_book
)

router = APIRouter()


@router.get("/books")
def get_books():

    return get_all_books()


@router.delete("/books/{book_name}")
def remove_book(book_name: str):

    try:

        # Delete vectors from ChromaDB
        delete_book(book_name)

        # Delete uploaded PDF
        pdf_path = os.path.join(
            "uploads",
            book_name
        )

        if os.path.exists(pdf_path):
            os.remove(pdf_path)

        # Delete JSON chunks
        json_path = os.path.join(
            "data",
            f"{book_name}.json"
        )

        if os.path.exists(json_path):
            os.remove(json_path)

        return {
            "message": f"{book_name} deleted successfully."
        }

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
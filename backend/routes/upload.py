from fastapi import APIRouter, UploadFile, File
import os
import json
import time

from services.chunk_service import create_chunks
from services.pdf_service import extract_text_from_pdf
from services.embedding_service import generate_embeddings
from services.vector_store import store_chunks
from services.upload_status import update_status

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_book(file: UploadFile = File(...)):

    # Reset upload status
    update_status("Starting Upload...")

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # -----------------------------
    # Extract Text
    # -----------------------------
    update_status("Extracting Text...")

    start = time.time()

    extracted_text = extract_text_from_pdf(file_path)

    print(f"Text extraction: {time.time() - start:.2f}s")

    # -----------------------------
    # Chunk Book
    # -----------------------------
    update_status("Chunking Book...")

    start = time.time()

    chunks = create_chunks(extracted_text)

    print(f"Chunking: {time.time() - start:.2f}s")
    print(f"Total Chunks: {len(chunks)}")

    # -----------------------------
    # Generate Embeddings
    # -----------------------------
    update_status("Generating Embeddings...")

    start = time.time()

    embeddings = generate_embeddings(chunks)

    print(f"Embedding: {time.time() - start:.2f}s")

    # -----------------------------
    # Save to ChromaDB
    # -----------------------------
    update_status("Saving Knowledge...")

    start = time.time()

    print(">>> BEFORE store_chunks()")

    store_chunks(
        chunks,
        file.filename
    )

    print(">>> AFTER store_chunks()")

    print(f"Store in ChromaDB: {time.time() - start:.2f}s")
    # -----------------------------
    # Save JSON
    # -----------------------------
    os.makedirs("data", exist_ok=True)

    with open(
        f"data/{file.filename}.json",
        "w",
        encoding="utf-8"
    ) as f:

        json.dump(
            chunks,
            f,
            ensure_ascii=False,
            indent=2
        )

    print("Upload completed successfully!")

    update_status("Completed")

    return {
        "message": "Book uploaded successfully",
        "filename": file.filename,
        "total_chunks": len(chunks)
    }
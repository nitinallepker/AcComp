import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="academic_books"
)

def store_chunks(chunks, embeddings, filename):

    ids = [
        f"{filename}_{i}"
        for i in range(len(chunks))
    ]

    metadatas = [
        {
            "book": filename,
            "chunk_id": i
        }
        for i in range(len(chunks))
    ]

    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        ids=ids,
        metadatas=metadatas
    )


def search_chunks(query):

    results = collection.query(
        query_texts=[query],
        n_results=10
    )

    return results


def get_context(query):

    results = collection.query(
        query_texts=[query],
        n_results=10
    )

    docs = results["documents"][0]

    context = "\n\n".join(docs)

    return context


def retrieve_context_with_sources(
    query,
    book_name=None
):

    if book_name:

        results = collection.query(
            query_texts=[query],
            n_results=10,
            where={
                "book": book_name
            }
        )

    else:

        results = collection.query(
            query_texts=[query],
            n_results=10
        )

    docs = results["documents"][0]
    metas = results["metadatas"][0]

    context = "\n\n".join(docs)

    return context, metas


def get_all_books():

    results = collection.get(
        include=["metadatas"]
    )

    books = set()

    for metadata in results["metadatas"]:
        books.add(metadata["book"])

    return sorted(list(books))


# ----------------------------
# NEW FUNCTION
# ----------------------------

def delete_book(book_name):

    collection.delete(
        where={
            "book": book_name
        }
    )
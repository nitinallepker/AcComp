import { FaTrash } from "react-icons/fa";

function BookSidebar({
  books,
  selectedBook,
  setSelectedBook,
  onDeleteBook,
}) {
  return (
    <div className="books-list">

      {books.length === 0 ? (

        <p className="no-books">
          No books uploaded
        </p>

      ) : (

        books.map((book) => (

          <div
            key={book}
            className={
              selectedBook === book
                ? "book active"
                : "book"
            }
          >

            <span
              className="book-name"
              title={book}
              onClick={() => setSelectedBook(book)}
            >
              {book}
            </span>

            <FaTrash
              className="delete-book"
              title="Delete Book"
              onClick={() => onDeleteBook(book)}
            />

          </div>

        ))

      )}

    </div>
  );
}

export default BookSidebar;
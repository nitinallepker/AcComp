import { useEffect, useState } from "react";
import axios from "axios";

import BookSidebar from "./components/BookSidebar";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import ModeSelector from "./components/ModeSelector";
import UploadBook from "./components/UploadBook";

import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [mode, setMode] = useState("depth");

  const [bookChats, setBookChats] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);

      setBooks(response.data);

      if (response.data.length > 0 && !selectedBook) {
        setSelectedBook(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedBook) return;

    setBookChats((prev) => {
      if (prev[selectedBook]) return prev;

      return {
        ...prev,
        [selectedBook]: {
          exam: [],
          depth: [],
        },
      };
    });
  }, [selectedBook]);

  const currentMessages =
    selectedBook && bookChats[selectedBook]
      ? bookChats[selectedBook][mode]
      : [];

  const handleDeleteBook = async (book) => {
    const confirmDelete = window.confirm(
      `Delete "${book}" permanently?`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/books/${encodeURIComponent(book)}`
      );

      setBookChats((prev) => {
        const updated = { ...prev };
        delete updated[book];
        return updated;
      });

      const remainingBooks = books.filter(
        (b) => b !== book
      );

      setBooks(remainingBooks);

      if (selectedBook === book) {
        if (remainingBooks.length > 0) {
          setSelectedBook(remainingBooks[0]);
        } else {
          setSelectedBook(null);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete book.");
    }
  };

  const handleSend = async (question) => {
    if (!selectedBook) return;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setBookChats((prev) => ({
      ...prev,
      [selectedBook]: {
        ...prev[selectedBook],
        [mode]: [
          ...prev[selectedBook][mode],
          userMessage,
        ],
      },
    }));

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/chat`,
        {
          question,
          book_name: selectedBook,
          mode,
        }
      );

      const aiMessage = {
        sender: "ai",
        text: response.data.answer,
        sources: response.data.sources,
      };

      setBookChats((prev) => ({
        ...prev,
        [selectedBook]: {
          ...prev[selectedBook],
          [mode]: [
            ...prev[selectedBook][mode],
            aiMessage,
          ],
        },
      }));
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="sidebar-title">
          Books
        </h2>

        <UploadBook
          onUploadSuccess={fetchBooks}
        />

        <BookSidebar
          books={books}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          onDeleteBook={handleDeleteBook}
        />
      </aside>

      <main className="main-content">
        <h1>AcComp</h1>

        <p>
          -- Your personal AI assistant for academic learning and concept mastery --
        </p>

        <ModeSelector
          mode={mode}
          setMode={setMode}
        />

        <ChatWindow
          messages={currentMessages}
          loading={loading}
        />

        <ChatInput
          onSend={handleSend}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;
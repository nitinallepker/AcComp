import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-wrapper">

      <div className="chat-input">

        <textarea
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything from the selected book..."
          rows={1}
        />

        <button
          onClick={handleSend}
          disabled={loading}
        >
          {loading
            ? "Thinking..."
            : "Send"}
        </button>

      </div>

    </div>
  );
}

export default ChatInput;
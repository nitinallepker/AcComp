import { useEffect, useRef, useState } from "react";

function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  const [thinkingText, setThinkingText] =
    useState("Thinking.");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (!loading) return;

    const states = [
      "Thinking.",
      "Thinking..",
      "Thinking...",
    ];

    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % states.length;
      setThinkingText(states[index]);
    }, 500);

    return () => clearInterval(interval);
  }, [loading]);

  const cleanText = (text) => {
    if (!text) return "";

    return text
      .replace(/^#+\s/gm, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "");
  };

  const formatMessage = (text) => {
    const cleaned = cleanText(text);

    return cleaned
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, index) => {
        const trimmed = line.trim();

        const isHeading =
          trimmed.length < 50 &&
          !trimmed.endsWith(".") &&
          !trimmed.includes(":");

        return isHeading ? (
          <h3
            key={index}
            className="ai-heading"
          >
            {trimmed}
          </h3>
        ) : (
          <p
            key={index}
            className="ai-paragraph"
          >
            {trimmed}
          </p>
        );
      });
  };

  return (
    <div className="chat-window">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`message ${msg.sender}`}
        >

          <div className="message-content">

            {msg.sender === "ai"
              ? formatMessage(msg.text)
              : (
                <p className="user-text">
                  {msg.text}
                </p>
              )}

          </div>

        </div>

      ))}

      {loading && (

        <div className="message ai">

          <div className="thinking-text">

            {thinkingText}

          </div>

        </div>

      )}

      <div ref={bottomRef} />

    </div>
  );
}

export default ChatWindow;
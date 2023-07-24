import React, { useState, useEffect, useRef } from "react";
import { addEntry } from "./database";

const JournalBox = ({ id }) => {
  const [buttons, setButtons] = useState([
    { topic: "Personal", hide: false },
    { topic: "Work", hide: false },
    { topic: "Relationship", hide: false },
    { topic: "Family", hide: false },
  ]);
  const [activeButton, setActiveButton] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const formatDate = (time) => {
    const date = new Date(time);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const { format } = Intl.DateTimeFormat("en-US", options);
    return format(date);
  };
  const formattedDate = formatDate(Date.now());
  const [currEntry, setCurrEntry] = useState({
    date: formattedDate,
    category: "General",
    text: "",
  }); // current entry [text
  addEntry(currEntry, id);
  const [prompt, setPrompt] = useState("");
  const textEvent = useRef(null);
  useEffect(() => {
    // Set the initial prompt only if it's empty
    if (!prompt) {
      setPrompt(
        categoryPrompts["General"][
          Math.floor(Math.random() * categoryPrompts["General"].length)
        ]
      );
    }
  }, [prompt]);

  const handleClick = (topic) => {
    setButtons((prev) =>
      prev.map((btn) => {
        if (btn.topic === topic) return btn;
        return { ...btn, hide: true };
      })
    );
    setCurrEntry((curr) => {
      curr.category = topic;
      return curr;
    });
    addEntry(currEntry, id);
    setActiveButton(topic);
    setShowMoreButton(true); // set showMoreButton to true when any button is active
  };

  const updateText = () => {
    const text = textEvent.current.value;
    setCurrEntry((curr) => {
      curr.text = text;
      return curr;
    });
    addEntry(currEntry, id);
  };

  const categoryPrompts = {
    General: [
      "What happened today?",
      "What was the best thing that happened today?",
      "What was the worst thing that happened today?",
      "What was the most interesting thing you saw or heard today?",
      "What was the most challenging thing you faced today?",
      "What are you grateful for today?",
      "What did you learn today?",
      "What was the most fun thing you did today?",
      "What was the most surprising thing that happened today?",
      "What did you do today that you are proud of?",
    ],
  };

  return (
    <div className="journal-box">
      <div className="journal-header">
        <h2>About my</h2>

        <div className="topic-buttons">
          {buttons.map((btn) => (
            <button
              key={btn.topic}
              className={activeButton === btn.topic ? "active" : ""}
              onClick={() => handleClick(btn.topic)}
              style={{ display: btn.hide ? "none" : "inline" }}
            >
              {btn.topic}
            </button>
          ))}
          {showMoreButton && (
            <button
              className={`more ${showMoreButton ? "active" : ""}`}
              onClick={() => {
                setShowMoreButton(false);
                setActiveButton(null);
                setButtons((prev) =>
                  prev.map((btn) => ({ ...btn, hide: false }))
                );
              }}
            >
              ...
            </button>
          )}
        </div>
      </div>

      <textarea
        ref={textEvent}
        onChange={updateText}
        className="journal-text"
        placeholder={
          prompt ||
          categoryPrompts["General"][
            Math.floor(Math.random() * categoryPrompts["General"].length)
          ]
        }
      ></textarea>
    </div>
  );
};

export default JournalBox;

import React, { useState, useEffect, useRef } from "react";
import { addEntry } from "./api";
import { formatDate } from "./utils";
import { ReactComponent as XButton } from "./charm_cross.svg";


const EntryCreateBox = ({ id, onDelete}) => {
  const [buttons, setButtons] = useState([
    { topic: "Personal", hide: false },
    { topic: "Work", hide: false },
    { topic: "Relationship", hide: false },
    { topic: "Family", hide: false },
  ]);
  const [activeButton, setActiveButton] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const formattedDate = formatDate(Date.now());
  const [currEntry, setCurrEntry] = useState({
    date: formattedDate,
    category: "General",
    text: "",
  });
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
    setActiveButton(topic);
    setShowMoreButton(true); // set showMoreButton to true when any button is active
  };

  const handleDelete = () => {
    onDelete(id);
  }

  const updateText = () => {
    const text = textEvent.current.value;
    setCurrEntry((curr) => {
      curr.text = text;
      return curr;
    });
    console.log(currEntry);
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
        <h2>I'm writing about my</h2>
        <div className={`topic-buttons ${showMoreButton ? "active" : ""}`}>
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
        <button
          className="delete-journal"
          onClick={handleDelete}>
          <XButton />
        </button>{" "}
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

export default EntryCreateBox;

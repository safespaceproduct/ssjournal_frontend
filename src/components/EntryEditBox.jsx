import React, { useState, useEffect, useRef, useCallback } from "react";
import { patchEntry, deleteEntryFromDB } from "./api";
import EmotionSelector from "./widgets/EmotionSelector";
import { INVERSEEMOTIONMAP, getEmotionChangeHandler } from "./EntryDetailCard";

const EntryEditBox = ({
  entry_id,
  defaultCategory,
  defaultText,
  date_created,
  defaultSentiment,
  onSave,
  userId,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buttons, setButtons] = useState([
    { topic: "Personal", hide: false },
    { topic: "Work", hide: false },
    { topic: "Relationship", hide: false },
    { topic: "Family", hide: false },
  ]);
  const [activeButton, setActiveButton] = useState(null);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [currEntry, setCurrEntry] = useState({
    id: entry_id,
    category: defaultCategory,
    text: defaultText,
    date_created: date_created,
    user_sentiment: defaultSentiment,
  });
  const textEvent = useRef(null);

  const updateText = () => {
    const text = textEvent.current.value;
    setCurrEntry((curr) => ({
      ...curr,
      text: text,
    }));
  };


  const confirmDelete = async () => {
    try {
      await deleteEntryFromDB(entry_id, userId); // Call your API function to update the entry
      setShowDeleteModal(false);
      onSave(currEntry); // Notify the parent component that the entry has been saved
    } catch (error) {
      console.error(`Failed to update entry: ${error}`);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleClick = useCallback(
    (topic) => {
      setButtons((prev) =>
        prev.map((btn) => {
          if (btn.topic === topic) return btn;
          return { ...btn, hide: true };
        })
      );
      setCurrEntry((curr) => ({
        ...curr,
        category: topic,
      }));
      setActiveButton(topic);
      setShowMoreButton(true); // set showMoreButton to true when any button is active
    },
    [] // add currEntry to the dependency array
  );

  const changeCategory = useCallback(
    (topic) => {
      setCurrEntry((curr) => ({
        ...curr,
        category: topic,
      }));
    },
    [] // add currEntry to the dependency array
  );

  useEffect(() => {


    // Set the initial active button based on the category prop, if provided
    if (defaultCategory) {
      const initialActiveButton = buttons.find(
        (btn) => btn.topic === defaultCategory
      );
      if (initialActiveButton) {
        handleClick(initialActiveButton.topic);
      }
    }
  }, [defaultCategory, handleClick]);

  const handleSave = async () => {
    if (currEntry.text === "") {
      setShowDeleteModal(true);
      return ;
    }
    try {
      
      const payload = {
        text: currEntry.text,
        category: currEntry.category,
        // user_sentiment: currEntry.user_sentiment,
      };
      const postId = currEntry.id;
      const response = await patchEntry(postId, payload, userId); // Call your API function to update the entry
      onSave(response); // Notify the parent component that the entry has been saved
    } catch (error) {
      console.error(`Failed to update entry: ${error}`);
    }
  };

  return (
    <div className="journal-box">
      <hr />
      <div className="journal-header">
        <h2>I'm writing about my</h2>
<br />
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
                changeCategory("General");
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
        value={currEntry.text}
      ></textarea>

      <EmotionSelector emotionCodeInput={INVERSEEMOTIONMAP[currEntry.user_sentiment]} 
                        changeEmotionCallback={getEmotionChangeHandler(
                          currEntry.id, 
                          userId, (x) => {})
                        }/>

        <div>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
        <br />
        <hr />
         {/* Render the delete confirmation modal if showDeleteModal is true*/}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Textbox is empty. Are you sure you want to delete this topic?</p>
            <div className="delete-modal-buttons">
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="confirm-button" onClick={confirmDelete}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default EntryEditBox;
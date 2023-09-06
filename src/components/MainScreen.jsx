import React, { useState } from "react";
import EntryList from "./EntryList";
import EntryCreateBox from "./EntryCreateBox";
import { getEntries, deleteEntry, postEntry } from "./database";
import { formatDate } from "./utils";
import { useParams } from "react-router-dom";

const MainScreen = ({showBox}) => {
  // journalBoxes are now objects with id and element
  const { user_id } = useParams();
  const [loggedEntries] = useState([]);
  const currentDate = Date.now();
  const formattedDate = formatDate(currentDate);
  const [shouldRenderEntryList, setShouldRenderEntryList] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRedoModal, setRedoModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showJournalEntry, setShowJournalEntry] = useState(showBox);

  const deleteJournal = (index) => {
    setDeleteTarget(index);
    setShowDeleteModal(true);
  };

  const [journalBoxes, setEntryCreateBoxes] = useState([
    {
      id: 0,
      element: <EntryCreateBox id={0} onDelete={deleteJournal} />,
    },
  ]);

  const confirmRedo = () => {
    setRedoModal(false);
  };

  // remove the journal boxes, and log the new entries
  const saveJournal = async () => {
    for (const tempEntry of getEntries()) {
      if (tempEntry !== "" && tempEntry.text === "") {
        setRedoModal(true);
        return;
      }
    }

    const entriesCopy = getEntries();
    setShowJournalEntry(false);
    setShouldRenderEntryList(false); // Set to false to hide the existing journal log temporarily
    for (const entry of entriesCopy) {
      if (entry === "" || entry.text === "") {
        continue; // Skip this entry if its entry is empty, AHHAHAHA
      }
      try {
        await postEntry(entry, user_id);
      } catch (error) {
        console.error(`Failed to post entry: ${error}`);
      }
    }

    try {
      setShouldRenderEntryList(true); // Set to true to re-render the EntryList component with the new entries
    } catch (error) {
      console.error(`Failed to fetch logged entries: ${error}`);
    }
  };

  // add new journal box
  const addTopic = () => {
    const newId = getEntries().length;
    const newBox = {
      id: newId,
      element: <EntryCreateBox id={newId} onDelete={deleteJournal} />,
    };
    setEntryCreateBoxes((prev) => [...prev, newBox]);
  };

  // delete journal box, and their entries

  const confirmDelete = () => {
    deleteEntry(deleteTarget);
    setEntryCreateBoxes((prev) => prev.filter((box) => box.id !== deleteTarget));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="journal-app">
        {/* <h1 className="title">Document your thoughts 💭</h1> */}
        
        {showJournalEntry && (
          <div>
            <h3 className="Titledate">{formattedDate}</h3>
          <div className="journal-entry">
            
            {journalBoxes.map((box) => (
              <div key={box.id}>
                {box.element}
                
              </div>
            ))}
            <button className="new-topic-button" onClick={addTopic}>
              Add another topic
            </button>
            <br />
            <button className="save-button" onClick={saveJournal}>
              Save
            </button>
          </div>
          </div>
        )}
        {/* Render the EntryList component only if shouldRenderEntryList is true*/}
        {shouldRenderEntryList && (
          <div>
            <EntryList user_id={user_id} showEntrySaved={!showJournalEntry} />
          </div>
        )}
      </div>

      {/* Render the delete confirmation modal if showDeleteModal is true*/}
      {showDeleteModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Are you sure you want to delete this topic?</p>
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

      {/* Render the delete confirmation modal if showDeleteModal is true*/}
      {showRedoModal && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <p>Textbox is empty. Please write something before saving.</p>
            <div className="delete-modal-buttons">
              <button className="confirm-button" onClick={confirmRedo}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MainScreen;

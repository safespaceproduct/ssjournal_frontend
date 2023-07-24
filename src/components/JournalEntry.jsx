import React, { useState } from "react";
import JournalLog from "./JournalLog";
import JournalBox from "./JournalBox";
import { getEntries, deleteEntry } from "./database";
import { formatDate } from "./utils";

const JournalEntry = () => {
  // journalBoxes are now objects with id and element
  const [journalBoxes, setJournalBoxes] = useState([
    {
      id: 0,
      element: <JournalBox id={0} />,
    },
  ]);
  const [loggedEntries, setLoggedEntries] = useState([]);
  const currentDate = Date.now();
  const formattedDate = formatDate(currentDate);

  // remove the journal boxes, and log the new entries
  const saveJournal = () => {
    // After saving, add them to the logged entries
    const curr = getEntries();
    const entriesCopy = curr.slice();
    setLoggedEntries(entriesCopy);
    setJournalBoxes([]);
  };

  // add new journal box
  const addTopic = () => {
    const newId = `${getEntries().length}`;
    const newBox = {
      id: newId,
      element: <JournalBox id={newId} />,
    };
    setJournalBoxes((prev) => [...prev, newBox]);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // delete journal box, and their entries
  const deleteJournal = (index) => {
    setDeleteTarget(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteEntry(deleteTarget);
    setJournalBoxes((prev) => prev.filter((box) => box.id !== deleteTarget));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <div className="journal-app">
        <h1 className="title">Document your thoughts 💭</h1>
        <h3 class="date">{formattedDate}</h3>
        <div className="journal-entry">
          {journalBoxes.map((box) => (
            <div key={box.id}>
              {box.element}
              <button
                className="delete-journal"
                onClick={() => deleteJournal(box.id)}
              >
                X
              </button>{" "}
            </div>
          ))}
          <button className="new-topic-button" onClick={addTopic}>
            Add another topic
          </button>
          <br />
          <br />

          <button className="save-button" onClick={saveJournal}>
            Save
          </button>
        </div>
        <div>{<JournalLog entries={loggedEntries} />}</div>

        {/* Delete Confirmation Modal */}
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
      </div>
    </div>
  );
};

export default JournalEntry;

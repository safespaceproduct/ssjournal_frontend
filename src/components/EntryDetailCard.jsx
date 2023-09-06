import React, { useState } from "react";
import { getTime } from "./utils";
import { CheckOne } from "@icon-park/react";
import { Icon } from "@iconify/react";

import EntryEditBox from "./EntryEditBox";
import EmotionSelector from "./EmotionSelector";
import { patchEntry } from "./database";

const EntryDetailCard = ({ group, date, showEntrySaved, user_id }) => {
  const [editing, setEditing] = useState(null);
  const [entries, setEntries] = useState(group);
  // const [isEmpty, setIsEmpty] = useState(entries.length === 0);

  const handleEdit = (entry) => {
    setEditing({ ...entry });
  };

  const handleCancel = () => {
    setEditing(null);
  };

  function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  const changeEmotionCallback = async (newEmotionCode) => {

    const payload = {}
    const response = await patchEntry();

    await sleep(1000);
    console.log(newEmotionCode);
  }

  const handleSave = (newEntry) => {
    // Update the state of the entries
    var updatedEntries
    if (newEntry.text === "") {
      updatedEntries = entries.filter((entry) => entry.id !== newEntry.id);
    } else {
      updatedEntries = entries.map((entry) => {
        if (entry.id === newEntry.id) {
          return newEntry;
        }
        return entry;
      });
    }
    setEntries(updatedEntries);
    setEditing(null);
  };

  return (
    <div className={`logByDate ${entries.length === 0 ? "hide" : ""}`}>
      <div>
        <h2 className="journal-entry-box-header">
          <span className="date">{date}</span>
          {showEntrySaved && (
            <div className="entry-saved-message">
              <CheckOne theme="filled" size="16" fill="#63B6AA" />
              <span>Entry saved</span>
            </div>
          )}
        </h2>{" "}
        <div className="log-item">
          {entries.map((entry) => (
            <div key={entry.id}>
              {editing && editing.id === entry.id ? (
                <EntryEditBox
                  entry_id={entry.id}
                  defaultCategory={entry.category}
                  defaultText={entry.text}
                  date_created={entry.date_created}
                  onCancel={handleCancel}
                  onSave={handleSave}
                  user_id={user_id}
                />
              ) : (
                <div>
                  <h3>
                    About My {entry.category}{" "}
                    <span className="timeStyle">
                      {getTime(entry.date_created)}
                      <Icon
                        className="fas fa-edit"
                        icon="fluent:edit-20-regular"
                        style={{ float: "right", cursor: "pointer", size: "20", color: "#3d4040" }}
                        onClick={() => handleEdit(entry)}
                      />{" "}
                    </span>
                  </h3>
                  <p className="log-text">{entry.text}</p>

                  <EmotionSelector emotionCodeInput={0} changeEmotionCallback={changeEmotionCallback}/>

                  
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntryDetailCard;
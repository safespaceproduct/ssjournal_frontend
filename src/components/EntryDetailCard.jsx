import React, { useState } from "react";
import { getTime } from "./utils";
import { CheckOne } from "@icon-park/react";
import { Icon } from "@iconify/react";

import EntryEditBox from "./EntryEditBox";
import EmotionSelector from "./EmotionSelector";
import { patchEntry } from "./api";

const EMOTIONMAP = {0: -1, 1 : 90, 2 : 70, 3 : 50, 4 : 30, 5 : 10};
export const INVERSEEMOTIONMAP = {90: 1, 70 : 2, 50 : 3, 30 : 4, 10 : 5, 
  '-1.0' : 0};

export const getEmotionChangeHandler = (entryId, userId, callback) => ( async (newEmotionCode) => {
  
  const payload = {
    user_sentiment: EMOTIONMAP[newEmotionCode],
  };
  const response = await patchEntry(entryId, payload, userId);

  if (callback !== null){
    callback(response);
  }
});

const EntryDetailCard = ({ group, date, showEntrySaved, userId }) => {
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
                  defaultSentiment={entry.user_sentiment}
                  dateCreated={entry.dateCreated}
                  onCancel={handleCancel} 
                  // TODO: figure out why is onCancel not in the source code for EntryDetailCard
                  onSave={handleSave}
                  userId={userId}
                />
              ) : (
                <div>
                  <h3>
                    About My {entry.category}{" "}
                    <span className="timeStyle">
                      {getTime(entry.dateCreated)}
                      <Icon
                        className="fas fa-edit"
                        icon="fluent:edit-20-regular"
                        style={{ float: "right", cursor: "pointer", size: "20", color: "#3d4040" }}
                        onClick={() => handleEdit(entry)}
                      />{" "}
                    </span>
                  </h3>
                  <p className="log-text">{entry.text}</p>

                  <EmotionSelector emotionCodeInput={INVERSEEMOTIONMAP[entry.user_sentiment]} 
                    changeEmotionCallback={getEmotionChangeHandler(entry.id, userId, handleSave)}
                    detailMode={true}/>
                  
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
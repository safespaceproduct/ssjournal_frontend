import React, { useState } from "react";
import { getTime } from "./utils";
import { CheckOne } from "@icon-park/react";
import { Icon } from "@iconify/react";
import EditableBox from "./EditableBox";

const GroupLogs = ({ group, date, showEntrySaved }) => {
  const [editing, setEditing] = useState(null);
  const [entries, setEntries] = useState(group);

  const handleEdit = (entry) => {
    setEditing({ ...entry });
  };

  const handleCancel = () => {
    setEditing(null);
  };

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
              <EditableBox
                entry_id={entry.id}
                defaultCategory={entry.category}
                defaultText={entry.text}
                date_created={entry.date_created}
                onCancel={handleCancel}
                onSave={handleSave}
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
                      style={{ float: "right", cursor: "pointer", color: "#3d4040", size: "20" }}
                      onClick={() => handleEdit(entry)}
                    />{" "}
                  </span>
                </h3>
                <p className="log-text">{entry.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLogs;
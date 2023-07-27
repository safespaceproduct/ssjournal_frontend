import { getTime } from "./utils";
import { CheckOne } from "@icon-park/react";
import { Icon } from "@iconify/react";

const GroupLogs = ({ group, date, showEntrySaved }) => {
  const handleEdit = (entryId) => {
    // Add your edit logic here
    console.log("Editing entry with id ${entryId}");
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
        {group.map((entry) => (
          <div key={entry.id}>
            <h3>
              About My {entry.category}{" "}
              <span className="timeStyle">
                {getTime(entry.date_created)}
                <Icon
                  className="fas fa-edit"
                  icon="fluent:edit-20-regular"
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => handleEdit(entry)}
                />{" "}
              </span>
            </h3>
            <p className="log-text">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLogs;
import React from "react";
import { formatDate } from "./utils";

const getTime = (date) => {
  return date.slice(-8);
};

const JournalEntry = ({ id, date, category, text }) => {
  return (
    <div className="log-item">
      <div className="log-meta">
        <h3>
          About My {category}
          <span className="timeStyle">
            {getTime(date)}
            <i className="fas fa-edit" style={{ float: "right" }}></i>
          </span>
        </h3>
      </div>
      <p className="log-text">{text}</p>
    </div>
  );
};

const groupEntriesByDate = (entries) => {
  const groupedEntries = {};

  entries.forEach((entry) => {
    const date = formatDate(entry.date);
    if (groupedEntries[date]) {
      groupedEntries[date].push(entry);
    } else {
      groupedEntries[date] = [entry];
    }
  });

  return groupedEntries;
};

const JournalLog = ({ entries }) => {
  const groupedEntries = groupEntriesByDate(entries);

  return (
    <div className="journal-log">
      {Object.keys(groupedEntries).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          {groupedEntries[date].map((entry) => (
            <JournalEntry key={entry.id} {...entry} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default JournalLog;

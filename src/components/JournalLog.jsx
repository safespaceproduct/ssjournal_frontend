import React, { useState, useEffect } from "react";
import { formatDBDate } from "./utils";
import { fetchEntry } from "./database";
import GroupLogs from "./GroupLogs";

/*
#Probably not needed anymore (?)
  const JournalEntry = ({ date_created, category, text }) => {
  return (
    <div className="log-item">
      <div className="log-meta">
        <h3>
          About My {category}
          <span className="timeStyle">
            {getTime(date_created)}
            <i className="fas fa-edit" style={{ float: "right" }}></i>
          </span>
        </h3>
      </div>
      <p className="log-text">{text}</p>
    </div>
  );
};
*/

const groupEntriesByDate = (entries) => {
  const TESTENTRY = {
    id: 1234,
    date_created: "2023-07-01T12:34:56.000Z",
    category: "Mood",
    text: "Feeling great today!",
  };
  const testEntries = [TESTENTRY, ...entries];
  const reversedEntries = [...testEntries].reverse();
  const groupedEntries = {};
  reversedEntries.forEach((entry) => {
    const date = formatDBDate(entry.date_created);
    if (groupedEntries[date]) {
      groupedEntries[date].push(entry);
    } else {
      groupedEntries[date] = [entry];
    }
  });
  return groupedEntries;
};

const JournalLog = ({ user_id }) => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await fetchEntry(user_id);
      setEntries(entries);
    };

    fetchEntries();
  }, [user_id]);

  const groupedEntries = groupEntriesByDate(entries);
  const groupKeys = Object.keys(groupedEntries);

  return (
    <div className="journal-log">
      {groupKeys.map((groupKey) => {
        const entries = groupedEntries[groupKey];

        return <GroupLogs key={groupKey} group={entries} date={groupKey} />;
      })}
    </div>
  );
};
export default JournalLog;

import React, { useState, useEffect } from "react";
import { formatDBDate } from "./utils";
import { fetchEntry } from "./database";
import GroupLogs from "./GroupLogs";

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

const JournalLog = ({ user_id, showEntrySaved }) => {
  const [entries, setEntries] = useState([]);
  console.log(entries);

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
        const isShowEntrySaved = showEntrySaved && groupKey === groupKeys[0];
        return (
          <GroupLogs
            key={groupKey}
            group={entries}
            date={groupKey}
            showEntrySaved={isShowEntrySaved}
          />
        );
      })}
    </div>
  );
};
export default JournalLog;

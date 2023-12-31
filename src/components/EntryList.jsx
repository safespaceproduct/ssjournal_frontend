import React, { useState, useEffect } from "react";
import { formatDBDate } from "./utils";
import { fetchEntry } from "./api";
import EntryDetailCard from "./EntryDetailCard";

const groupEntriesByDate = (entries) => {
  const TESTENTRY = {
    id: 1234,
    date_created: "2023-07-01T12:34:56.000Z",
    category: "Mood",
    text: "Feeling great today!",
  };
  const testEntries = [...entries];
  const reversedEntries = [...testEntries].reverse();
  const groupedEntries = {};

  // console.log(groupedEntries);
  // console.log(reversedEntries);

  reversedEntries.forEach((entry) => {

    const date = formatDBDate(entry.date_created);
    if (groupedEntries[date]) {
      groupedEntries[date].push(entry);
    } else {
      groupedEntries[date] = [entry];
    }
  });
  console.log('grouped entries', groupedEntries);
  return groupedEntries;

};

const EntryList = ({ userId, showEntrySaved }) => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const fetchEntries = async () => {
      const entries = await fetchEntry(userId);
      setEntries(entries);
    };

    fetchEntries();
  }, [userId]);

  const groupedEntries = groupEntriesByDate(entries);
  const groupKeys = Object.keys(groupedEntries).sort().reverse();
  return (
    <div className="journal-log">
      {groupKeys.map((groupKey) => {
        const entries = groupedEntries[groupKey];
        const isShowEntrySaved = showEntrySaved && groupKey === groupKeys[0];
        return (
          <EntryDetailCard
            key={groupKey}
            group={entries}
            date={groupKey}
            showEntrySaved={isShowEntrySaved}
            userId={userId}
          />
        );
      })}
    </div>
  );
};
export default EntryList;

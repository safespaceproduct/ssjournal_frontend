// database.js
// to be replaced by actual db in future

let journalEntries = [];

export function addEntry(entry, index) {
  journalEntries[index] = entry;
}

export function deleteEntry(index) {
  journalEntries.splice(index, 1);
}

export function getEntry(index) {
  return journalEntries[index];
}

export function getEntries() {
  return journalEntries;
}

export async function postEntry(entry, user_id) {
  const response = await fetch("http://localhost:8000/journalentry/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: entry.text,
      category: entry.category,
      user: user_id,
    }),
  });
  journalEntries = [];
  if (!response.ok) {
    throw new Error(`Failed to post entry: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchEntry(user_id) {
  const response = await fetch(
    `http://localhost:8000/journalentry?user=${user_id}`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch entry: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

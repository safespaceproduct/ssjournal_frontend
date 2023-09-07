import config from "./config";

const API_URL = config.API_URL;
let journalEntries = [];

export function addEntry(entry, index) {
  journalEntries[index] = entry;
}

export function deleteEntry(index) {
  journalEntries[index] = "";
}

export function getEntry(index) {
  return journalEntries[index];
}

export function getEntries() {
  return journalEntries;
}

export async function postEntry(entry, userId) {
  const response = await fetch(`${API_URL}/journalentry/?token=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: entry.text,
      category: entry.category,
      user_sentiment : -1.0,
    }),
  });
  journalEntries = [];
  if (!response.ok) {
    throw new Error(`Failed to post entry: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchEntry(userId) {
  const response = await fetch(`${API_URL}/journalentry/?token=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch entry: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function patchEntry(entryId, payload, userId) {

  const response = await fetch(`${API_URL}/journalentry/${entryId}/?token=${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Failed to patch entry: ${response.status}`);
  }
  const updatedEntry = await response.json();
  console.log(`Updated entry: ${JSON.stringify(updatedEntry)}`);
  return updatedEntry;
}

export async function deleteEntryFromDB(entry_id, userId) {
  const response = await fetch(`${API_URL}/journalentry/${entry_id}/?token=${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete entry: ${response.status}`);
  }
}
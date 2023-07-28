// database.js
// to be replaced by actual db in future

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

export async function patchEntry(entry) {
  console.log(
    JSON.stringify({
      text: entry.text,
      category: entry.category,
    })
  );
  const response = await fetch(
    `http://localhost:8000/journalentry/${entry.id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: entry.text,
        category: entry.category,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to patch entry: ${response.status}`);
  }
  const updatedEntry = await response.json();
  console.log(`Updated entry: ${JSON.stringify(updatedEntry)}`);  return updatedEntry;
}

export async function deleteEntryFromDB(entry_id) {
  const response = await fetch(`http://localhost:8000/journalentry/${entry_id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error(`Failed to delete entry: ${response.status}`);  
  }  
}

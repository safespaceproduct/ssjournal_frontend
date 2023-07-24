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

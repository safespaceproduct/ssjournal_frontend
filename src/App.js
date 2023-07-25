import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JournalEntry from "./components/JournalEntry";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="ssjournal_frontend/users/:user_id"
            element={<JournalEntry />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

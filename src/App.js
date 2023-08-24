import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import JournalEntry from "./components/JournalEntry";
import "./App.css";

// function App(){
//   return (
//     <div>Under maintenance!</div>
//   )
// }

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route
            path="users/:user_id"
            element={<JournalEntry showBox={true}/>}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}



export default App;

import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import MainScreen from "./components/MainScreen";
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
            path="users/:userId"
            element={<MainScreen showBox={true}/>}
          />
        </Routes>
      </div>
    </HashRouter>
  );
}



export default App;

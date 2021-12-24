import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";

const HatsPage = () => (
  <div>
    <h1>hates page</h1>
  </div>
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/hats" element={<HatsPage />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import Score from "./components/Score";
import "./index.css";

function App() {
  const [score, setScore] = useState(false);

  return (
    <>
      <div className="absolute top-0 right-0 p-4">
        <Score />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;

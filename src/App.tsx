import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import "./index.css";

function App() {
  const [start, setStart] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Game />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Game from "./components/Game";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [start, setStart] = useState(false);
  const navigate = useNavigate();

  const navigateGame = () => {
    navigate("/game");
  };

  return (
    <>
      <div>
        <h1 className="text-7xl font-medium text-green-500 py-6">
          {" "}
          Spotify Higher or Lower{" "}
        </h1>
        <button
          className="bg-green-500 text-2xl border-none hover:bg-green-700 text-white font-bold py-4 px-6 rounded"
          onClick={() => navigateGame()}
        >
          Start Game
        </button>
      </div>
    </>
  );
}

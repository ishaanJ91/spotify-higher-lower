import { useState, useEffect } from "react";

export default function Game() {
  const [start, setStart] = useState(false);

  return (
    <>
      <div>
        <h1 className="text-7xl font-medium text-green-500 py-6">
          {" "}
          Spotify Higher or Lower{" "}
        </h1>
        <button
          className="bg-green-500 text-2xl border-none hover:bg-green-700 text-white font-bold py-4 px-6 rounded"
          onClick={() => setStart(true)}
        >
          Start Game
        </button>
      </div>
    </>
  );
}

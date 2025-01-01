import { useState, useEffect } from "react";

export default function Score() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  if (score > highScore) {
    setHighScore(score);
  }

  return (
    <>
      <div className="flex flex-row w-screen px-20 justify-between">
        <p className="text-xl font-medium text-green-500 py-6">
          {" "}
          High Score: {highScore}{" "}
        </p>
        <p className="text-xl font-medium text-green-500 py-6">
          {" "}
          Score: {score}{" "}
        </p>
      </div>
    </>
  );
}

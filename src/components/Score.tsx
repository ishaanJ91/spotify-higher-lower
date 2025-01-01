import { useState, useEffect } from "react";

export default function Score() {
  const [score, setScore] = useState(false);
  const [highScore, setHighScore] = useState(false);

  return (
    <>
      <div>
        <p className="text-xl font-medium text-green-500 py-6">
          {" "}
          Your score is: 0{" "}
        </p>
      </div>
    </>
  );
}

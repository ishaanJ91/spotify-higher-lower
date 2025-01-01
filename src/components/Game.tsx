import { useState, useEffect } from "react";
import trackData from "../assets/data.json"; // Ensure this path is correct

function getRandomTracks(tracks: any[], count: number) {
  const shuffled = tracks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Game() {
  const [leftAlbum, setLeftAlbum] = useState<any[]>([]);
  const [rightAlbum, setRightAlbum] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hasHigher, setHasHigher] = useState(false);
  const [hasLower, setHasLower] = useState(false);
  var nf = new Intl.NumberFormat();

  useEffect(() => {
    if (score === 0) {
      const leftSelection = getRandomTracks(trackData, 1);
      const rightSelection = getRandomTracks(trackData, 1);
      setLeftAlbum(leftSelection);
      setRightAlbum(rightSelection);
    }
  }, [score]);

  const handleHigher = () => {
    if (leftAlbum[0].value > rightAlbum[0].value) {
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
      setLeftAlbum(rightAlbum);
      setRightAlbum(getRandomTracks(trackData, 1));
    } else {
      setScore(0);
    }
  };

  const handleLower = () => {
    if (leftAlbum[0].value > rightAlbum[0].value) {
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
      setLeftAlbum(rightAlbum);
      setRightAlbum(getRandomTracks(trackData, 1));
    } else {
      setScore(0);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center min-h-full w-screen">
        <div className="flex flex-row w-screen px-20 py-4 justify-between top-0">
          <p className="text-xl font-medium text-green-500 py-6">
            {" "}
            High Score: {highScore}{" "}
          </p>
          <p className="text-xl font-medium text-green-500 py-6">
            {" "}
            Score: {score}{" "}
          </p>
        </div>
        <div className="flex flex-row justify-evenly items-center px-20 mt-20">
          <div className="flex flex-row justify-around">
            {leftAlbum.map((track, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <img
                  src={track.displayImageUri}
                  alt={track.trackName}
                  width="300"
                  className="pb-6"
                />
                <h2>{track.trackName}</h2>
                <p>{track.name}</p>
                <h1>{nf.format(track.value)}</h1>
              </div>
            ))}
          </div>
          <p className="text-4xl">VS</p>
          <div className="flex flex-row justify-around">
            {rightAlbum.map((track, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <img
                  src={track.displayImageUri}
                  alt={track.trackName}
                  width="300"
                  className="pb-6"
                />
                <h2>{track.trackName}</h2>
                <p>{track.name}</p>
                <div className="flex flex-row gap-4">
                  <button
                    className="bg-green-700 text-white border-none hover:bg-green-900"
                    onClick={handleHigher}
                  >
                    Higher
                  </button>
                  <button
                    className="bg-green-700 text-white border-none hover:bg-green-900"
                    onClick={handleLower}
                  >
                    Lower
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

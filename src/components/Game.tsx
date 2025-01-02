import { useState, useEffect } from "react";
import trackData from "../assets/data.json"; // Ensure this path is correct

function getRandomTracks(tracks: any[], count: number) {
  let currentIndex = tracks.length;
  while (currentIndex != 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [tracks[currentIndex], tracks[randomIndex]] = [
      tracks[randomIndex],
      tracks[currentIndex],
    ];
  }
  return tracks.slice(0, count);
}

export default function Game() {
  const [leftAlbum, setLeftAlbum] = useState<any[]>([]);
  const [rightAlbum, setRightAlbum] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameOver, setGaveOver] = useState(false);
  const [rightStreams, setRightStreams] = useState(false);
  var nf = new Intl.NumberFormat();

  useEffect(() => {
    if (score === 0) {
      const leftSelection = getRandomTracks(trackData, 1);
      const rightSelection = getRandomTracks(trackData, 1);
      setLeftAlbum(leftSelection);
      setRightAlbum(rightSelection);
    }
  }, [score]);

  function showButtonHigh() {
    handleHigher();
    setRightStreams(true);
  }

  function showButtonLow() {
    handleLower();
    setRightStreams(true);
  }

  const handleHigher = () => {
    if (leftAlbum[0].value > rightAlbum[0].value) {
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
      setLeftAlbum(rightAlbum);
      setRightStreams(false);
      setRightAlbum(getRandomTracks(trackData, 1));
    } else {
      setGaveOver(true);
      setRightStreams(false);
    }
  };

  const handleLower = () => {
    if (leftAlbum[0].value > rightAlbum[0].value) {
      setScore(score + 1);
      setHighScore(Math.max(score + 1, highScore));
      setLeftAlbum(rightAlbum);
      setRightStreams(false);
      setRightAlbum(getRandomTracks(trackData, 1));
    } else {
      setGaveOver(true);
      setRightStreams(false);
    }
  };

  if (gameOver) {
    return (
      <div className="flex flex-col justify-center h-screen items-center text-white">
        <h1>Game Over</h1>
        <p>Your final score was {score}</p>
        <button
          className="bg-green-700 text-white border-none hover:bg-green-900"
          onClick={() => {
            setScore(0);
            setGaveOver(false);
            const leftSelection = getRandomTracks(trackData, 1);
            const rightSelection = getRandomTracks(trackData, 1);
            setLeftAlbum(leftSelection);
            setRightAlbum(rightSelection);
          }}
        >
          {" "}
          Play Again{" "}
        </button>
      </div>
    );
  }

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
                  {rightStreams ? (
                    <h1>{nf.format(track.value)}</h1>
                  ) : (
                    <div className="flex flex-row gap-4">
                      <button
                        className="bg-green-700 text-white border-none hover:bg-green-900"
                        onClick={showButtonHigh}
                      >
                        Higher
                      </button>
                      <button
                        className="bg-green-700 text-white border-none hover:bg-green-900"
                        onClick={showButtonLow}
                      >
                        Lower
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

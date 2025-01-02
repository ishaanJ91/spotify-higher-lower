import { useState, useEffect } from "react";
import trackData from "../assets/data.json";
import tick from "../assets/tick.svg";
import cross from "../assets/cross.svg";

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
  const [gameOver, setGameOver] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animatedStreams, setAnimatedStreams] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  var nf = new Intl.NumberFormat();

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(Number(storedHighScore));
    }

    const leftSelection = getRandomTracks(trackData, 1);
    const rightSelection = getRandomTracks(trackData, 1);
    setLeftAlbum(leftSelection);
    setRightAlbum(rightSelection);
  }, []);

  const updateHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("highScore", newScore.toString());
    }
  };

  const handleGuess = (isHigher: boolean) => {
    const correct = isHigher
      ? leftAlbum[0].value < rightAlbum[0].value
      : leftAlbum[0].value > rightAlbum[0].value;

    setIsCorrect(correct);
    setShowAnimation(true);

    // Start counting animation for streams
    let currentValue = rightAlbum[0].value - 2000000;
    setAnimatedStreams(currentValue);

    const interval = setInterval(() => {
      currentValue += 100000;
      if (currentValue >= rightAlbum[0].value) {
        clearInterval(interval);
        setAnimatedStreams(rightAlbum[0].value);

        setTimeout(() => {
          setShowAnimation(false);
          if (correct) {
            setScore(score + 1);
            updateHighScore(Math.max(score + 1, highScore));
            setLeftAlbum(rightAlbum);
            setRightAlbum(getRandomTracks(trackData, 1));
          } else {
            setGameOver(true);
          }
          setIsCorrect(null);
        }, 1500);
      }
      setAnimatedStreams(currentValue);
    }, 50);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col justify-center h-screen items-center text-white">
        <h1 className="text-6xl">Game Over</h1>
        <p className="text-2xl pt-5 pb-2">Your final score was {score}</p>
        <button
          className="bg-primary text-black border-none"
          onClick={() => {
            setScore(0);
            setGameOver(false);
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
      {/* Score */}
      <div className="flex flex-col justify-center min-h-full w-screen">
        <div className="flex flex-row w-screen px-20 py-4 justify-between top-0">
          <p className="text-xl font-medium text-primary py-6">
            {" "}
            High Score: {highScore}{" "}
          </p>
          <p className="text-xl font-medium text-primary py-6">
            {" "}
            Score: {score}{" "}
          </p>
        </div>

        {/* Game */}
        <div className="flex lg:flex-row xs:flex-col justify-evenly items-center px-20 mt-2">
          <div className="flex flex-row justify-around">
            {leftAlbum.map((track, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <img
                  src={track.displayImageUri}
                  alt={track.trackName}
                  className="pb-6 lg:w-80 lg:h-80 xs:w-60 xs:h-60"
                />
                <h2 className="text-center w-full max-w-xs xs:max-w-xs break-words">
                  {track.trackName}
                </h2>
                <p className="text-center w-full max-w-xs xs:max-w-md break-words">
                  {track.name}
                </p>
                <h1 className="lg:text-5xl xs:text-3xl">
                  {nf.format(track.value)}
                </h1>
              </div>
            ))}
          </div>

          <div
            className="w-fit-content flex justify-center items-center"
            style={{ height: "4rem" }}
          >
            {isCorrect !== null ? (
              <img src={isCorrect ? tick : cross} className="w-14 h-14" />
            ) : (
              <p className="text-4xl">VS</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <img
              src={rightAlbum[0]?.displayImageUri}
              alt={rightAlbum[0]?.trackName}
              className="pb-6 lg:w-80 lg:h-80 xs:w-60 xs:h-60"
            />
            <h2 className="text-center w-full max-w-xs break-words">
              {rightAlbum[0]?.trackName}
            </h2>
            <p className="text-center w-full max-w-md break-words">
              {rightAlbum[0]?.name}
            </p>
            {showAnimation ? (
              <h1
                className={`lg:text-5xl xs:text-3xl ${
                  isCorrect ? "text-primary" : "text-red-600"
                }`}
              >
                {nf.format(animatedStreams)}
              </h1>
            ) : null}
            {!showAnimation && (
              <div className="flex flex-row gap-4 mt-4">
                <button
                  className="text-primary bg-bg px-4 py-2 rounded-md border-solid border-1 border-primary hover:bg-primary hover:text-black"
                  onClick={() => handleGuess(true)}
                >
                  Higher
                </button>
                <button
                  className="text-primary bg-bg px-4 py-2 rounded-md border-solid border-1 border-primary hover:bg-primary hover:text-black"
                  onClick={() => handleGuess(false)}
                >
                  Lower
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from "react";
import trackData from "../assets/data.json"; // Ensure this path is correct

function getRandomTracks(tracks: any[], count: number) {
  const shuffled = tracks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Game() {
  const [randomTracks1, setRandomTracks1] = useState<any[]>([]);
  const [randomTracks2, setRandomTracks2] = useState<any[]>([]);
  const [higher, hasHigher] = useState(false);
  const [lower, hasLower] = useState(false);
  var nf = new Intl.NumberFormat();

  useEffect(() => {
    const randomSelection1 = getRandomTracks(trackData, 1);
    const randomSelection2 = getRandomTracks(trackData, 1);
    setRandomTracks1(randomSelection1);
    setRandomTracks2(randomSelection2);
  }, []);

  return (
    <div className="flex flex-row justify-around items-center">
      <div className="flex flex-row justify-around">
        {randomTracks1.map((track, index) => (
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
        {randomTracks2.map((track, index) => (
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
                onClick={() => hasHigher(true)}
              >
                Higher
              </button>
              <button
                className="bg-green-700 text-white border-none hover:bg-green-900"
                onClick={() => hasLower(true)}
              >
                Lower
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;

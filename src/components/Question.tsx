import { useState, useEffect } from "react";
import trackData from "../assets/data.json";

function getRandomTracks(tracks: any[], count: number) {
  const shuffled = tracks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function Question() {
  const [randomTracks, setRandomTracks] = useState<any[]>([]);
  const [higher, hasHigher] = useState(false);
  const [lower, hasLower] = useState(false);
  var nf = new Intl.NumberFormat();

  useEffect(() => {
    const randomSelection = getRandomTracks(trackData, 1);
    setRandomTracks(randomSelection);
  }, []);

  return (
    <div className="flex flex-row justify-around">
      {randomTracks.map((track, index) => (
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
  );
}

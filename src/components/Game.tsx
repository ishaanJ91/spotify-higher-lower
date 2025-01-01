import { useState, useEffect } from "react";
import trackData from "../assets/data.json"; // Ensure this path is correct

function getRandomTracks(tracks: any[], count: number) {
  const shuffled = tracks.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function Game() {
  const [randomTracks, setRandomTracks] = useState<any[]>([]);
  var nf = new Intl.NumberFormat();

  useEffect(() => {
    const randomSelection = getRandomTracks(trackData, 2); // Use the imported data here
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
          <h1>{nf.format(track.value)}</h1>
        </div>
      ))}
    </div>
  );
}

export default Game;

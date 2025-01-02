import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const navigateGame = () => {
    navigate("/game");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center text-white">
        <h1 className="text-7xl font-medium text-primary py-6">
          {" "}
          Spotify Higher or Lower{" "}
        </h1>
        <button
          className="bg-bg border-solid border-1 rounded-xl border-primary text-primary text-2xl hover:bg-primary hover:text-black font-bold py-4 px-6 rounded"
          onClick={() => navigateGame()}
        >
          Start Game
        </button>
      </div>
    </>
  );
}

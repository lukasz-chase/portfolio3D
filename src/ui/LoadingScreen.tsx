import { useAudioStore } from "../store/useAudioStore";
import { useGameStore } from "./useGameStore";

const LoadingScreen: React.FC = () => {
  const { hasStarted, setHasStarted } = useGameStore();
  const playSound = useAudioStore((s) => s.playSound);

  const handleStart = () => {
    setHasStarted(true);
    playSound("backgroundMusic");
  };

  return (
    <div className={`loading-screen ${hasStarted ? "hidden" : ""}`}>
      <div className="loading-screen__content">
        <h1 className="loading-screen__title">Loading...</h1>
        <p className="loading-screen__instructions">
          Use WASD/Arrow keys to move
        </p>
        <button className="loading-screen__play-button" onClick={handleStart}>
          Play
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;

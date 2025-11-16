import styles from "./LoadingScreen.module.css";
import { useGameStore } from "../../store/useGameStore";
import { useAudioStore } from "../../store/useAudioStore";

export const LoadingScreen: React.FC = () => {
  const { hasStarted, setHasStarted, isLoaded } = useGameStore();
  const playSound = useAudioStore((s) => s.playSound);

  const handleStart = () => {
    setHasStarted(true);
    playSound("backgroundMusic");
  };

  return (
    <div className={`${styles.root} ${hasStarted ? styles.hidden : ""}`}>
      <div className={styles.content}>
        {isLoaded ? (
          <>
            <p className={styles.instructions}>Use WASD/Arrow keys to move</p>
            <button className={styles.playButton} onClick={handleStart}>
              Play
            </button>
          </>
        ) : (
          <h1 className={styles.title}>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;

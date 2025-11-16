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
            <p className={styles.instructions}>Use WSAD/Arrow keys to move</p>
            <p className={styles.instructions}>Press objects to interact</p>
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

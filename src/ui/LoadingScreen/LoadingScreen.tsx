import styles from "./LoadingScreen.module.css";
import { useGameStore } from "../../store/useGameStore";

export const LoadingScreen: React.FC = () => {
  const { hasStarted, setHasStarted } = useGameStore();

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div className={`${styles.root} ${hasStarted ? styles.hidden : ""}`}>
      <div className={styles.content}>
        <h1 className={styles.title}>Loading...</h1>
        <p className={styles.instructions}>Use WASD/Arrow keys to move</p>
        <button className={styles.playButton} onClick={handleStart}>
          Play
        </button>
      </div>
    </div>
  );
};

export default LoadingScreen;

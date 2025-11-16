import { useCallback, useState } from "react";
import { useAudioStore } from "../../store/useAudioStore";
import { useGameStore } from "../../store/useGameStore";
import { useThemeStore } from "../../store/useThemeStore";
import styles from "./Settings.module.css";

export const Settings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isMuted = useAudioStore((s) => s.isMuted);
  const toggleMute = useAudioStore((s) => s.toggleMute);

  const setIsDark = useThemeStore((s) => s.setIsDark);
  const isDark = useThemeStore((s) => s.isDark);

  const moveSpeed = useGameStore((s) => s.moveSpeed);
  const setMoveSpeed = useGameStore((s) => s.setMoveSpeed);
  const jumpHeight = useGameStore((s) => s.jumpHeight);
  const setJumpHeight = useGameStore((s) => s.setJumpHeight);

  const toggleTheme = useCallback(() => {
    const body = document.body;
    const currentlyDark = body.classList.contains("dark-theme");

    if (currentlyDark) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
    } else {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
    }

    setIsDark(!currentlyDark);
  }, [setIsDark]);

  return (
    <div className={styles.root}>
      <button
        className={`${styles.button} ${styles.settingsButton}`}
        onClick={() => setIsOpen((v) => !v)}
      >
        {/* gear */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            fill="white"
            d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {/* Theme row */}
          <div className={styles.row}>
            <span className={styles.label}>Theme</span>
            <button
              onClick={toggleTheme}
              className={styles.iconButton}
              aria-pressed={isDark}
            >
              {isDark ? (
                // moon / night icon
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 46 46"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.8333 0H46V46H0V26.8333H26.8333V0ZM34 12H41.6667V19.6667H34V12ZM33.2222 26.8333H40.8889V34.5H33.2222V26.8333ZM23 33.2222H15.3333V40.8889H23V33.2222Z"
                  />
                </svg>
              ) : (
                // sun / day icon
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 80 80"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="25" y="25" width="30" height="30" fill="white" />
                  <rect
                    width="4"
                    height="19"
                    transform="matrix(-1 0 0 1 42 0)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="19"
                    transform="matrix(-1 0 0 1 42 61)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="19"
                    transform="matrix(0 -1 -1 0 80 42)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="14"
                    transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 18.8994 22.728)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="14"
                    transform="matrix(0.719888 0.69409 -0.719888 0.69409 19.0786 59.0491)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="14"
                    transform="matrix(0.707107 0.707107 0.707107 -0.707107 58 19.8994)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="14"
                    transform="matrix(0.719888 -0.69409 0.719888 0.69409 58.1792 61.7764)"
                    fill="white"
                  />
                  <rect
                    width="4"
                    height="19"
                    transform="matrix(0 -1 -1 0 19 42)"
                    fill="white"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Audio row */}
          <div className={styles.row}>
            <span className={styles.label}>Audio</span>
            <button
              onClick={toggleMute}
              className={styles.iconButton}
              aria-pressed={!isMuted}
            >
              {isMuted ? (
                // muted
                <svg
                  viewBox="0 0 64 64"
                  width="30"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="20" width="20" height="24" fill="white" />
                  <rect x="24" y="16" width="10" height="32" fill="white" />
                  <rect x="34" y="12" width="8" height="40" fill="white" />
                  <rect x="46" y="22" width="6" height="6" fill="white" />
                  <rect x="58" y="22" width="6" height="6" fill="white" />
                  <rect x="52" y="28" width="6" height="6" fill="white" />
                  <rect x="46" y="34" width="6" height="6" fill="white" />
                  <rect x="58" y="34" width="6" height="6" fill="white" />
                </svg>
              ) : (
                // sound on
                <svg
                  viewBox="0 0 64 64"
                  width="30"
                  height="30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="20" width="20" height="24" fill="white" />
                  <rect x="24" y="16" width="10" height="32" fill="white" />
                  <rect x="34" y="12" width="8" height="40" fill="white" />
                  <rect x="46" y="22" width="6" height="20" fill="white" />
                  <rect x="54" y="18" width="6" height="28" fill="white" />
                </svg>
              )}
            </button>
          </div>

          {/* Move Speed row */}
          <div className={styles.rowColumn}>
            <div className={styles.rowHeader}>
              <span className={styles.label}>Move Speed</span>
              <span className={styles.speedValue}>{moveSpeed.toFixed(1)}x</span>
            </div>
            <input
              className={styles.slider}
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={moveSpeed}
              onChange={(e) => setMoveSpeed(parseFloat(e.target.value))}
            />
            <div className={styles.sliderLabels}>
              <span>0.5x</span>
              <span>3x</span>
            </div>
          </div>

          {/* Jump Height row */}
          <div className={styles.rowColumn}>
            <div className={styles.rowHeader}>
              <span className={styles.label}>Jump Height</span>
              <span className={styles.speedValue}>
                {jumpHeight.toFixed(1)}x
              </span>
            </div>
            <input
              className={styles.slider}
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={jumpHeight}
              onChange={(e) => setJumpHeight(parseFloat(e.target.value))}
            />
            <div className={styles.sliderLabels}>
              <span>0.5x</span>
              <span>3x</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;

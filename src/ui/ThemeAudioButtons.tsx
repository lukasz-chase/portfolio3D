import { useCallback } from "react";
import { useAudioStore } from "../store/useAudioStore";
import { useThemeStore } from "../store/useThemeStore";

const ThemeAudioButtons: React.FC = () => {
  const isMuted = useAudioStore((s) => s.isMuted);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const setIsDark = useThemeStore((s) => s.setIsDark);

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
    <div className="ui-buttons">
      <button className="theme-mode-toggle-button" onClick={toggleTheme}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="first-icon"
          fill="none"
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

        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          className="second-icon"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.8333 0H46V46H0V26.8333H26.8333V0ZM34 12H41.6667V19.6667H34V12ZM33.2222 26.8333H40.8889V34.5H33.2222V26.8333ZM23 33.2222H15.3333V40.8889H23V33.2222Z"
            fill="white"
          />
        </svg>
      </button>
      <button className="audio-toggle-button" onClick={toggleMute}>
        {isMuted ? (
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
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
          <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="20" width="20" height="24" fill="white" />
            <rect x="24" y="16" width="10" height="32" fill="white" />
            <rect x="34" y="12" width="8" height="40" fill="white" />

            <rect x="46" y="22" width="6" height="20" fill="white" />
            <rect x="54" y="18" width="6" height="28" fill="white" />
          </svg>
        )}
      </button>
    </div>
  );
};
export default ThemeAudioButtons;

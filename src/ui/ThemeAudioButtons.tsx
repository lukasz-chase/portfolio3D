import React, { useCallback } from "react";
import { useAudioStore } from "../store/useAudioStore";

const ThemeAudioButtons: React.FC = () => {
  const isMuted = useAudioStore((s) => s.isMuted);
  const toggleMute = useAudioStore((s) => s.toggleMute);

  const toggleTheme = useCallback(() => {
    document.body.classList.toggle("dark-theme");
    document.body.classList.toggle("light-theme");
    // you can also tween lights in a store or use R3F state
  }, []);

  return (
    <div className="ui-buttons">
      <button className="theme-mode-toggle-button" onClick={toggleTheme}>
        Theme
      </button>
      <button className="audio-toggle-button" onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};
export default ThemeAudioButtons;

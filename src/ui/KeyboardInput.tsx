// src/ui/KeyboardInput.tsx
import { useEffect } from "react";
import { useInputStore } from "../store/useInputStore";

export const KeyboardInput: React.FC = () => {
  const setPressed = useInputStore((s) => s.setPressed);
  const reset = useInputStore((s) => s.reset);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const code = event.code.toLowerCase();
      if (code === "keyw" || code === "arrowup") setPressed("up", true);
      if (code === "keys" || code === "arrowdown") setPressed("down", true);
      if (code === "keya" || code === "arrowleft") setPressed("left", true);
      if (code === "keyd" || code === "arrowright") setPressed("right", true);
      if (code === "keyr") {
        // you can either call a store action to respawn or keep R mapped in Player
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const code = event.code.toLowerCase();
      if (code === "keyw" || code === "arrowup") setPressed("up", false);
      if (code === "keys" || code === "arrowdown") setPressed("down", false);
      if (code === "keya" || code === "arrowleft") setPressed("left", false);
      if (code === "keyd" || code === "arrowright") setPressed("right", false);
    };

    const handleBlur = () => {
      reset();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, [reset, setPressed]);

  return null;
};

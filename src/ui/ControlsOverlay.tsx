// src/ui/ControlsOverlay.tsx
import React from "react";
import { type Direction, useInputStore } from "../store/useInputStore";

const ControlsOverlay: React.FC = () => {
  const setPressed = useInputStore((s) => s.setPressed);

  const handlePress =
    (dir: Direction, value: boolean) =>
    (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
      setPressed(dir, value);
    };

  return (
    <div className="mobile-controls">
      <button
        className="mobile-control up-arrow"
        onMouseDown={handlePress("up", true)}
        onMouseUp={handlePress("up", false)}
        onMouseLeave={handlePress("up", false)}
        onTouchStart={handlePress("up", true)}
        onTouchEnd={handlePress("up", false)}
        onTouchCancel={handlePress("up", false)}
      >
        ↑
      </button>
      {/* left/right/down similarly */}
    </div>
  );
};
export default ControlsOverlay;

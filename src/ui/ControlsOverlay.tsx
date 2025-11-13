import { useEffect, useRef } from "react";
import { type Direction, useInputStore } from "../store/useInputStore";

const ControlsOverlay: React.FC = () => {
  const setPressed = useInputStore((s) => s.setPressed);

  const upRef = useRef<HTMLButtonElement>(null);
  const downRef = useRef<HTMLButtonElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const eventOptions = { passive: false };

    const buttons = [
      { ref: upRef, dir: "up" as Direction },
      { ref: downRef, dir: "down" as Direction },
      { ref: leftRef, dir: "left" as Direction },
      { ref: rightRef, dir: "right" as Direction },
    ];

    const cleanupFunctions: (() => void)[] = [];

    buttons.forEach(({ ref, dir }) => {
      const el = ref.current;
      if (!el) return;

      const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        setPressed(dir, true);
      };

      const handleTouchEnd = (e: TouchEvent) => {
        e.preventDefault();
        setPressed(dir, false);
      };

      const handleTouchCancel = (e: TouchEvent) => {
        e.preventDefault();
        setPressed(dir, false);
      };

      el.addEventListener("touchstart", handleTouchStart, eventOptions);
      el.addEventListener("touchend", handleTouchEnd, eventOptions);
      el.addEventListener("touchcancel", handleTouchCancel, eventOptions);

      cleanupFunctions.push(() => {
        el.removeEventListener("touchstart", handleTouchStart);
        el.removeEventListener("touchend", handleTouchEnd);
        el.removeEventListener("touchcancel", handleTouchCancel);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="mobile-controls">
      <button ref={upRef} className="mobile-control up-arrow">
        ↑
      </button>

      <button ref={leftRef} className="mobile-control left-arrow">
        ←
      </button>

      <button ref={rightRef} className="mobile-control right-arrow">
        →
      </button>

      <button ref={downRef} className="mobile-control down-arrow">
        ↓
      </button>
    </div>
  );
};

export default ControlsOverlay;

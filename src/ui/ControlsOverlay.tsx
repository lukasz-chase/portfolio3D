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
        <svg
          width="45"
          height="34"
          viewBox="0 0 45 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="11.7988"
            y="17.072"
            width="5.64259"
            height="20.7622"
            transform="rotate(-90 11.7988 17.072)"
            fill="#FEFEFE"
          />
          <rect
            x="7.68359"
            y="22.7148"
            width="5.64259"
            height="28.811"
            transform="rotate(-90 7.68359 22.7148)"
            fill="#FEFEFE"
          />
          <rect
            x="3.93311"
            y="28.3574"
            width="5.64259"
            height="37.0427"
            transform="rotate(-90 3.93311 28.3574)"
            fill="#FEFEFE"
          />
          <rect
            y="34"
            width="5.64259"
            height="45"
            transform="rotate(-90 0 34)"
            fill="#FEFEFE"
          />
          <rect
            x="15.5488"
            y="11.4297"
            width="5.64259"
            height="13.3537"
            transform="rotate(-90 15.5488 11.4297)"
            fill="#FEFEFE"
          />
          <rect
            x="19.0244"
            y="5.78711"
            width="5.64259"
            height="6.31098"
            transform="rotate(-90 19.0244 5.78711)"
            fill="#FEFEFE"
          />
        </svg>
      </button>

      <button ref={leftRef} className="mobile-control left-arrow">
        <svg
          width="45"
          height="34"
          viewBox="0 0 45 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="11.7988"
            y="17.072"
            width="5.64259"
            height="20.7622"
            transform="rotate(-90 11.7988 17.072)"
            fill="#FEFEFE"
          />
          <rect
            x="7.68359"
            y="22.7148"
            width="5.64259"
            height="28.811"
            transform="rotate(-90 7.68359 22.7148)"
            fill="#FEFEFE"
          />
          <rect
            x="3.93311"
            y="28.3574"
            width="5.64259"
            height="37.0427"
            transform="rotate(-90 3.93311 28.3574)"
            fill="#FEFEFE"
          />
          <rect
            y="34"
            width="5.64259"
            height="45"
            transform="rotate(-90 0 34)"
            fill="#FEFEFE"
          />
          <rect
            x="15.5488"
            y="11.4297"
            width="5.64259"
            height="13.3537"
            transform="rotate(-90 15.5488 11.4297)"
            fill="#FEFEFE"
          />
          <rect
            x="19.0244"
            y="5.78711"
            width="5.64259"
            height="6.31098"
            transform="rotate(-90 19.0244 5.78711)"
            fill="#FEFEFE"
          />
        </svg>
      </button>

      <button ref={rightRef} className="mobile-control right-arrow">
        <svg
          width="45"
          height="34"
          viewBox="0 0 45 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="11.7988"
            y="17.072"
            width="5.64259"
            height="20.7622"
            transform="rotate(-90 11.7988 17.072)"
            fill="#FEFEFE"
          />
          <rect
            x="7.68359"
            y="22.7148"
            width="5.64259"
            height="28.811"
            transform="rotate(-90 7.68359 22.7148)"
            fill="#FEFEFE"
          />
          <rect
            x="3.93311"
            y="28.3574"
            width="5.64259"
            height="37.0427"
            transform="rotate(-90 3.93311 28.3574)"
            fill="#FEFEFE"
          />
          <rect
            y="34"
            width="5.64259"
            height="45"
            transform="rotate(-90 0 34)"
            fill="#FEFEFE"
          />
          <rect
            x="15.5488"
            y="11.4297"
            width="5.64259"
            height="13.3537"
            transform="rotate(-90 15.5488 11.4297)"
            fill="#FEFEFE"
          />
          <rect
            x="19.0244"
            y="5.78711"
            width="5.64259"
            height="6.31098"
            transform="rotate(-90 19.0244 5.78711)"
            fill="#FEFEFE"
          />
        </svg>
      </button>

      <button ref={downRef} className="mobile-control down-arrow">
        <svg
          width="45"
          height="34"
          viewBox="0 0 45 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="11.7988"
            y="17.072"
            width="5.64259"
            height="20.7622"
            transform="rotate(-90 11.7988 17.072)"
            fill="#FEFEFE"
          />
          <rect
            x="7.68359"
            y="22.7148"
            width="5.64259"
            height="28.811"
            transform="rotate(-90 7.68359 22.7148)"
            fill="#FEFEFE"
          />
          <rect
            x="3.93311"
            y="28.3574"
            width="5.64259"
            height="37.0427"
            transform="rotate(-90 3.93311 28.3574)"
            fill="#FEFEFE"
          />
          <rect
            y="34"
            width="5.64259"
            height="45"
            transform="rotate(-90 0 34)"
            fill="#FEFEFE"
          />
          <rect
            x="15.5488"
            y="11.4297"
            width="5.64259"
            height="13.3537"
            transform="rotate(-90 15.5488 11.4297)"
            fill="#FEFEFE"
          />
          <rect
            x="19.0244"
            y="5.78711"
            width="5.64259"
            height="6.31098"
            transform="rotate(-90 19.0244 5.78711)"
            fill="#FEFEFE"
          />
        </svg>
      </button>
    </div>
  );
};

export default ControlsOverlay;

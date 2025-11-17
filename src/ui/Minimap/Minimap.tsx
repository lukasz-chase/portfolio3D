import { useMemo, useState } from "react";
import styles from "./Minimap.module.css";
import { usePlayerStore } from "../../store/usePlayerStore";
import { WORLD_BOUNDS } from "../../constants";

const Minimap: React.FC = () => {
  const playerPosition = usePlayerStore((s) => s.position);
  const [isExpanded, setIsExpanded] = useState(false);

  const mapSize = {
    width: window.innerWidth < 500 ? 70 : 180,
    height: window.innerWidth < 500 ? 80 : 200,
  };

  const playerMapPosition = useMemo(() => {
    const worldWidth = WORLD_BOUNDS.maxX - WORLD_BOUNDS.minX;
    const worldHeight = WORLD_BOUNDS.maxZ - WORLD_BOUNDS.minZ;

    const normX = (playerPosition.x - WORLD_BOUNDS.minX) / worldWidth;
    const normZ = (playerPosition.z - WORLD_BOUNDS.minZ) / worldHeight;

    const correctedX = 1 - normZ;
    const correctedY = normX;

    const clamp = (v: number) => Math.min(1, Math.max(0, v));

    const cx = clamp(correctedX);
    const cy = clamp(correctedY);

    return {
      left: `${cx * mapSize.width}px`,
      top: `${cy * mapSize.height}px`,
    };
  }, [playerPosition, mapSize.width, mapSize.height]);

  const handleClick = () => {
    if (isExpanded) {
      mapSize.width = mapSize.width * 2;
      mapSize.height = mapSize.height * 2;
    } else {
      mapSize.width = mapSize.width / 2;
      mapSize.height = mapSize.height / 2;
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`${styles.minimapContainer} ${
        isExpanded ? styles.expanded : ""
      }`}
      style={{ width: mapSize.width + 4, height: mapSize.height + 4 }} // +4 as border
      onClick={handleClick}
    >
      <div
        className={styles.map}
        style={{ width: mapSize.width, height: mapSize.height }}
      >
        <div className={styles.playerDot} style={playerMapPosition} />

        <span className={`${styles.label} ${styles.contact}`}>Contact</span>
        <span className={`${styles.label} ${styles.experience}`}>
          Experience
        </span>
        <span className={`${styles.label} ${styles.projects}`}>Projects</span>
      </div>
    </div>
  );
};

export default Minimap;

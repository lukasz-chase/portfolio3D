import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";

export const Loader: React.FC = () => {
  const { active } = useProgress();
  const setIsLoaded = useGameStore((s) => s.setIsLoaded);

  useEffect(() => {
    setIsLoaded(true);
  }, [active, setIsLoaded]);

  return null;
};

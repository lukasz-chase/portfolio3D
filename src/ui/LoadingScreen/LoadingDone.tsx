import { useEffect } from "react";
import { useGameStore } from "../../store/useGameStore";

const LoadingDone = () => {
  const setIsLoaded = useGameStore((s) => s.setIsLoaded);

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return null;
};

export default LoadingDone;

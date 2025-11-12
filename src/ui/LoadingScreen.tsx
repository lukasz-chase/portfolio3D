import { Html, useProgress } from "@react-three/drei";

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="loading-screen">
        <p className="loading-text">Loading {progress.toFixed(0)}%</p>
      </div>
    </Html>
  );
};

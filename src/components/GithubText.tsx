import { Float } from "@react-three/drei";
import InteractiveModel from "./InteractiveModel";

const path = "/models/GithubText.glb";

const GithubText: React.FC = () => {
  return (
    <Float
      rotationIntensity={0}
      floatIntensity={10}
      floatingRange={[-0, 0.3]}
      speed={1.5}
    >
      <InteractiveModel
        path={path}
        tint="#d6c3ff"
        onClick={() =>
          window.open(
            "https://github.com/lukasz-chase",
            "_blank",
            "noopener,noreferrer"
          )
        }
      />
    </Float>
  );
};

export default GithubText;

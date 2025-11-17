import { Float } from "@react-three/drei";
import InteractiveModel from "./InteractiveModel";

const path = "/models/LinkedinText.glb";

const LinkedinText: React.FC = () => {
  return (
    <Float
      rotationIntensity={0}
      floatIntensity={10}
      floatingRange={[-0, 0.3]}
      speed={1.2}
    >
      <InteractiveModel
        path={path}
        tint="#9bb8ff"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/lukasz-scigaj/",
            "_blank",
            "noopener,noreferrer"
          )
        }
      />
    </Float>
  );
};

export default LinkedinText;

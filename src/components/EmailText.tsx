import { Float } from "@react-three/drei";
import InteractiveModel from "./InteractiveModel";

const EmailText: React.FC = () => {
  return (
    <Float rotationIntensity={0} floatIntensity={10} floatingRange={[-0, 0.3]}>
      <InteractiveModel
        path="/models/EmailText.glb"
        tint="#ffe8a3"
        onClick={() =>
          (window.location.href = "mailto:lukasz.scigaj00@gmail.com")
        }
      />
    </Float>
  );
};

export default EmailText;

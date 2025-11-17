import { Float } from "@react-three/drei";
import InteractiveModel from "./InteractiveModel";

const path = "/models/CvText.glb";

const CvText: React.FC = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/CV.pdf";
    link.download = "Lukasz_Scigaj_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Float rotationIntensity={0} floatIntensity={10} floatingRange={[-0, 0.3]}>
      <InteractiveModel path={path} tint="#b6f2d1" onClick={handleDownload} />
    </Float>
  );
};

export default CvText;

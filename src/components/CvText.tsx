import { useGLTF } from "@react-three/drei";

const CvText: React.FC = () => {
  const { scene } = useGLTF("/models/CvText.glb");

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default CvText;

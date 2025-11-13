import { useGLTF } from "@react-three/drei";

const EmailText: React.FC = () => {
  const { scene } = useGLTF("/models/EmailText.glb");

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default EmailText;

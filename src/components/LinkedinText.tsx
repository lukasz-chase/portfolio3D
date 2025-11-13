import { useGLTF } from "@react-three/drei";

const path = "/models/LinkedinText.glb";

useGLTF.preload(path);

const LinkedinText: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default LinkedinText;

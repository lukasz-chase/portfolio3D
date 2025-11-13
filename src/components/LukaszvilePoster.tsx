import { useGLTF } from "@react-three/drei";

const path = "/models/LukaszvilePoster.glb";

useGLTF.preload(path);

const LukaszvilePoster: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default LukaszvilePoster;

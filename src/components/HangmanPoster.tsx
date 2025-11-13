import { useGLTF } from "@react-three/drei";

const path = "/models/HangmanPoster.glb";

useGLTF.preload(path);

const HangmanPoster: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default HangmanPoster;

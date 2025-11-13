import { useGLTF } from "@react-three/drei";

const path = "/models/Bench.glb";

useGLTF.preload(path);

const Bench: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default Bench;

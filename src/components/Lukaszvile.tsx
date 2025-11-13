import { useGLTF } from "@react-three/drei";

const path = "/models/Lukaszvile.glb";

useGLTF.preload(path);

const Lukaszvile: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default Lukaszvile;

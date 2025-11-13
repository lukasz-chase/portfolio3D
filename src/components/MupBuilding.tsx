import { useGLTF } from "@react-three/drei";

const path = "/models/MupBuilding.glb";

useGLTF.preload(path);

const MupBuilding: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default MupBuilding;

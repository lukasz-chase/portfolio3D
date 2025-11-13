import { useGLTF } from "@react-three/drei";

const path = "/models/KoffeecupBuilding.glb";

useGLTF.preload(path);

const KoffeecupBuilding: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default KoffeecupBuilding;

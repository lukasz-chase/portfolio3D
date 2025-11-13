import { useGLTF } from "@react-three/drei";

const path = "/models/GoodBuilding.glb";

useGLTF.preload(path);

const GoodBuilding: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default GoodBuilding;

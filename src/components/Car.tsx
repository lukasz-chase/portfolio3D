import { useGLTF } from "@react-three/drei";

const Car: React.FC = () => {
  const { scene } = useGLTF("/models/Car.glb");

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default Car;

import { useGLTF } from "@react-three/drei";

const TruegrindPoster: React.FC = () => {
  const { scene } = useGLTF("/models/TruegrindPoster.glb");

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default TruegrindPoster;

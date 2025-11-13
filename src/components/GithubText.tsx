import { useGLTF } from "@react-three/drei";

const path = "/models/GithubText.glb";

useGLTF.preload(path);

const GithubText: React.FC = () => {
  const { scene } = useGLTF(path);

  return <primitive object={scene.children[0]} castShadow receiveShadow />;
};

export default GithubText;

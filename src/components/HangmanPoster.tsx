import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

const path = "/models/HangmanPoster.glb";

useGLTF.preload(path);

const HangmanPoster: React.FC = () => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

export default HangmanPoster;

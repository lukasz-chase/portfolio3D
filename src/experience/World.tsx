import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const path = "/models/Scene.glb";

useGLTF.preload(path);

export const World: React.FC = () => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
};

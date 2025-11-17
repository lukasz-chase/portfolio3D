import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

const path = "/models/Scene.glb";

export const World: React.FC = () => {
  const { scene } = useGLTF(path);

  const processedScene = useMemo(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return scene;
  }, [scene]);

  return <primitive object={processedScene} />;
};

useGLTF.preload(path);

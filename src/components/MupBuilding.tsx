import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

const path = "/models/MupBuilding.glb";

useGLTF.preload(path);

const MupBuilding: React.FC = () => {
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

export default MupBuilding;

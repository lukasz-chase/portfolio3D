import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody } from "@react-three/rapier";

type PortfolioGLTF = {
  scene: THREE.Group;
};

useGLTF.preload("/models/Portfolio.glb");

export const World: React.FC = () => {
  const { scene } = useGLTF(
    "/models/Portfolio.glb"
  ) as unknown as PortfolioGLTF;

  // Clone & strip things so we don't reuse the same Object3D in multiple places
  const { environment, collidersMesh } = useMemo(() => {
    const env = scene.clone(true);

    const characterInEnv = env.getObjectByName("Character");
    if (characterInEnv) {
      characterInEnv.parent?.remove(characterInEnv);
    }

    const collidersInEnv = env.getObjectByName("Colliders");
    if (collidersInEnv) {
      collidersInEnv.parent?.remove(collidersInEnv);
    }

    const collidersOriginal = scene.getObjectByName(
      "Colliders"
    ) as THREE.Mesh | null;
    console.log(collidersOriginal);
    const collidersClone = collidersOriginal
      ? collidersOriginal.clone(true)
      : null;

    env.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return { environment: env, collidersMesh: collidersClone };
  }, [scene]);

  return (
    <>
      <primitive object={environment} />

      {collidersMesh && (
        <RigidBody type="fixed" colliders="trimesh" includeInvisible>
          <primitive object={collidersMesh} visible={false} />
        </RigidBody>
      )}
    </>
  );
};

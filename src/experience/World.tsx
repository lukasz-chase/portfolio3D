// src/experience/World.tsx
import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Octree } from "three/examples/jsm/math/Octree.js";
import usePhysicsStore from "../store/usePhysicsStore";

type PortfolioGLTF = {
  scene: THREE.Group;
};

useGLTF.preload("/models/Portfolio.glb");

export const World: React.FC = () => {
  const { scene } = useGLTF(
    "/models/Portfolio.glb"
  ) as unknown as PortfolioGLTF;
  const setColliderOctree = usePhysicsStore((s) => s.setColliderOctree);

  useEffect(() => {
    const octree = new Octree();

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }

      if (child.name === "Colliders") {
        octree.fromGraphNode(child);
        (child as THREE.Mesh).visible = false;
      }
    });

    setColliderOctree(octree);
  }, [scene, setColliderOctree]);

  return <primitive object={scene} />;
};

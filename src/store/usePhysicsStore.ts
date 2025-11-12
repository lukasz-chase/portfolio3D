// src/store/usePhysicsStore.ts
import { create } from "zustand";
import { Octree } from "three/examples/jsm/math/Octree.js";
import * as THREE from "three";

type PhysicsState = {
  colliderOctree: Octree | null;
  spawnPosition: THREE.Vector3 | null;
  setColliderOctree: (octree: Octree) => void;
  setSpawnPosition: (pos: THREE.Vector3) => void;
};

const usePhysicsStore = create<PhysicsState>((set) => ({
  colliderOctree: null,
  spawnPosition: null,
  setColliderOctree: (octree) => set({ colliderOctree: octree }),
  setSpawnPosition: (pos) => set({ spawnPosition: pos.clone() }),
}));

export default usePhysicsStore;

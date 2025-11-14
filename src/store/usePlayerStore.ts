import { create } from "zustand";
import * as THREE from "three";

interface PlayerState {
  position: THREE.Vector3;
  hasMoved: boolean;
  jumped: boolean;
  setPosition: (x: number, y: number, z: number) => void;
  setHasMoved: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  position: new THREE.Vector3(121, 2, -4),
  hasMoved: false,
  jumped: false,
  setPosition: (x, y, z) => {
    const { position } = get();
    if (
      Math.abs(position.x - x) > 0.001 ||
      Math.abs(position.y - y) > 0.001 ||
      Math.abs(position.z - z) > 0.001
    ) {
      set({ position: new THREE.Vector3(x, y, z) });
    }
  },
  setHasMoved: () => set({ hasMoved: true }),
}));

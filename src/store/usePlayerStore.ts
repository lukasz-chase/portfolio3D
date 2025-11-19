import { create } from "zustand";
import { PLAYER_INIT_POSITION } from "../constants";

type Vec3 = { x: number; y: number; z: number };

type PlayerState = {
  position: Vec3;
  setPosition: (x: number, y: number, z: number) => void;

  hasMoved: boolean;
  setHasMoved: () => void;

  teleportTo: Vec3 | null;
  setTeleportTo: (pos: Vec3 | null) => void;

  isUsingBench: boolean;
  setIsUsingBench: (value: boolean) => void;

  hasMovedFromBench: boolean;
  setHasMovedFromBench: (moved: boolean) => void;
};

export const usePlayerStore = create<PlayerState>((set) => ({
  position: PLAYER_INIT_POSITION,
  setPosition: (x, y, z) => set({ position: { x, y, z } }),

  hasMoved: false,
  setHasMoved: () => set({ hasMoved: true }),

  teleportTo: null,
  setTeleportTo: (pos) => set({ teleportTo: pos }),

  isUsingBench: false,
  setIsUsingBench: (value) => set({ isUsingBench: value }),

  hasMovedFromBench: false,
  setHasMovedFromBench: (moved) => set({ hasMovedFromBench: moved }),
}));

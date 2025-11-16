import { create } from "zustand";

interface GameState {
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  hasStarted: false,
  setHasStarted: (hasStarted) => set({ hasStarted }),
}));

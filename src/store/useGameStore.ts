import { create } from "zustand";

interface GameState {
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

export const useGameStore = create<GameState>((set) => ({
  hasStarted: false,
  setHasStarted: (hasStarted) => set({ hasStarted }),
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

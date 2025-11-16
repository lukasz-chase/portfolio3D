import { create } from "zustand";

interface GameState {
  hasStarted: boolean;
  setHasStarted: (hasStarted: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
  moveSpeed: number;
  setMoveSpeed: (speed: number) => void;
  jumpHeight: number;
  setJumpHeight: (speed: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  hasStarted: false,
  setHasStarted: (hasStarted) => set({ hasStarted }),
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
  moveSpeed: 1,
  setMoveSpeed: (speed) => set({ moveSpeed: speed }),
  jumpHeight: 1,
  setJumpHeight: (speed) => set({ jumpHeight: speed }),
}));

import { create } from "zustand";

export type Direction = "up" | "down" | "left" | "right";

type PressedMap = Record<Direction, boolean>;

type InputState = {
  pressed: PressedMap;
  setPressed: (dir: Direction, value: boolean) => void;
  reset: () => void;
};

const initialState: PressedMap = {
  up: false,
  down: false,
  left: false,
  right: false,
};

export const useInputStore = create<InputState>((set) => ({
  pressed: initialState,
  setPressed: (dir, value) =>
    set((state) => ({
      pressed: { ...state.pressed, [dir]: value },
    })),
  reset: () => set({ pressed: initialState }),
}));

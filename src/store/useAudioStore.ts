// src/store/useAudioStore.ts
import { create } from "zustand";
import { Howl } from "howler";

export type SoundId =
  | "backgroundMusic"
  | "projectsSFX"
  | "pokemonSFX"
  | "jumpSFX";

const sounds: Record<SoundId, Howl> = {
  backgroundMusic: new Howl({
    src: ["./sfx/music.ogg"],
    loop: true,
    volume: 0.3,
    preload: true,
  }),
  projectsSFX: new Howl({
    src: ["./sfx/projects.ogg"],
    volume: 0.5,
    preload: true,
  }),
  pokemonSFX: new Howl({
    src: ["./sfx/pokemon.ogg"],
    volume: 0.5,
    preload: true,
  }),
  jumpSFX: new Howl({
    src: ["./sfx/jumpsfx.ogg"],
    volume: 1.0,
    preload: true,
  }),
};

type AudioState = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (id: SoundId) => void;
  stopSound: (id: SoundId) => void;
};

export const useAudioStore = create<AudioState>((set, get) => ({
  isMuted: false,
  toggleMute: () => {
    const { isMuted } = get();
    const next = !isMuted;
    if (next) {
      sounds.backgroundMusic.pause();
    } else {
      sounds.backgroundMusic.play();
    }
    set({ isMuted: next });
  },
  playSound: (id) => {
    if (!get().isMuted) {
      sounds[id]?.play();
    }
  },
  stopSound: (id) => {
    sounds[id]?.stop();
  },
}));

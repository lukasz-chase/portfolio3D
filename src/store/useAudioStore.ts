import { create } from "zustand";
import { Howl } from "howler";
import { SoundId } from "../types";

const sounds: Record<SoundId, Howl> = {
  backgroundMusic: new Howl({
    src: ["./sfx/music.ogg"],
    loop: true,
    volume: 0.1,
    preload: true,
  }),
  interactionSFX: new Howl({
    src: ["./sfx/interaction.ogg"],
    volume: 0.5,
    preload: true,
  }),
  benchSFX: new Howl({
    src: ["./sfx/bench.ogg"],
    volume: 0.5,
    preload: true,
  }),
  jumpSFX: new Howl({
    src: ["./sfx/jumpsfx.ogg"],
    volume: 0.6,
    preload: true,
  }),
  carSFX: new Howl({
    src: ["./sfx/carsfx.ogg"],
    volume: 0.3,
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
      sounds[id]?.stop().play();
    }
  },
  stopSound: (id) => {
    sounds[id]?.stop();
  },
}));

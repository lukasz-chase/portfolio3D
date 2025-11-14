import { ModalContent, ModalId } from "./types";

export const MODAL_IDS = {
  PROJECT_TRUEGRIND: "Project_Truegrind",
  PROJECT_LUKASZVILE: "Project_Lukaszvile",
  PROJECT_HANGMAN: "Project_Hangman",
  LUKASZVILE: "Lukaszvile",
  GOOD_BUILDING: "Good_Building",
  KOFFEECUP_BUILDING: "Koffeecup_Building",
  MUP_BUILDING: "Mup_Building",
} as const;

export const MODAL_CONTENT: Record<ModalId, ModalContent> = {
  [MODAL_IDS.PROJECT_TRUEGRIND]: {
    title: "True Grind",
    content: "True Grind is a workout tracking app",
    link: "https://example.com/",
  },
  [MODAL_IDS.PROJECT_LUKASZVILE]: {
    title: "Lukaszvile",
    content: "This is the website you are using, a 3d portfolio",
    link: "https://example.com/",
  },
  [MODAL_IDS.PROJECT_HANGMAN]: {
    title: "Hangman",
    content: "Project I created as my praca inzynierska",
    link: "https://example.com/",
  },
  [MODAL_IDS.LUKASZVILE]: {
    title: "About Me",
    content:
      "Hi, I'm Łukasz Ścigaj and I am an Full Stack Developer based in Poland.",
  },
  [MODAL_IDS.GOOD_BUILDING]: {
    title: "Experience",
    content: "GOOD: czas: tytul",
  },
  [MODAL_IDS.KOFFEECUP_BUILDING]: {
    title: "Experience",
    content: "Koffeecup: czas: tytul",
  },
  [MODAL_IDS.MUP_BUILDING]: {
    title: "Education",
    content: "Mup: czas: tytul",
  },
};
export const MOVE_SPEED = 35;
export const JUMP_SPEED = 14;

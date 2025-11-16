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
    title: "TrueGrind",
    content:
      "Mobile workout tracker for people who actually like numbers. Create routines, log sets and follow your progress over time – all in a clean, minimal UI.",
    techStack: ["React Native", "Expo", "Supabase"],
    github: "https://github.com/lukasz-chase/truegrind",
    website: "https://example.com/",
    kind: "project",
  },

  [MODAL_IDS.PROJECT_LUKASZVILE]: {
    title: "Lukaszvile",
    content:
      "You’re standing in it 👋 A 3D isometric world that doubles as my portfolio. Built to show how I think about UX, performance and playful interactions in the browser.",
    techStack: ["React", "react-three/fiber", "drei", "rapier"],
    github: "https://github.com/lukasz-chase/portfolio3D",
    website: "https://example.com/",
    kind: "project",
  },

  [MODAL_IDS.PROJECT_HANGMAN]: {
    title: "Realtime Hangman",
    content:
      "Multiplayer Hangman built as my engineering thesis project. Realtime gameplay, persistent scores and a modern, responsive UI.",
    techStack: ["Next.js", "Tailwind", "Prisma", "WebSockets"],
    github: "https://github.com/lukasz-chase/truegrind",
    website: "https://example.com/",
    kind: "project",
  },

  [MODAL_IDS.LUKASZVILE]: {
    title: "About Me",
    content:
      "Hi, I’m Łukasz Ścigaj – a full-stack TypeScript developer from Poland. I enjoy building playful frontends, solid APIs and everything in between.",
    kind: "about",
  },

  [MODAL_IDS.GOOD_BUILDING]: {
    title: "Experience",
    kind: "experience",
    company: "GOOD",
    period: "2021.08 – 2022.10",
    role: "Junior Full-Stack Developer",
  },

  [MODAL_IDS.KOFFEECUP_BUILDING]: {
    title: "Experience",
    kind: "experience",
    company: "Koffeecup",
    period: "2022.10 – Present",
    role: "Full-Stack Developer",
  },

  [MODAL_IDS.MUP_BUILDING]: {
    title: "Education",
    kind: "education",
    company:
      "Małopolska Uczelnia Państwowa im. rotmistrza W. Pileckiego w Oświęcimiu",
    period: "2020.10 – 2024.02",
    role: "Bachelor of Engineering in Computer Science",
  },
};

export const MOVE_SPEED = 35;
export const JUMP_HEIGHT = 14;

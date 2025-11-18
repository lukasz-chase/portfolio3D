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
    website: "https://truegrind.netlify.app/",
    kind: "project",
  },

  [MODAL_IDS.PROJECT_LUKASZVILE]: {
    title: "Lukaszvile",
    content:
      "You’re standing in it 👋 A 3D isometric world that doubles as my portfolio. Created from scratch by me in blender, my first take on 3D in web development.",
    techStack: ["React", "react-three/fiber", "drei", "rapier"],
    github: "https://github.com/lukasz-chase/portfolio3D",
    website: "https://lukaszscigaj.pl",
    kind: "project",
  },

  [MODAL_IDS.PROJECT_HANGMAN]: {
    title: "Realtime Hangman",
    content:
      "Multiplayer Hangman built as my engineering thesis project. Realtime gameplay, persistent scores and a modern, responsive UI.",
    techStack: ["Next.js", "Tailwind", "Prisma", "WebSockets"],
    github: "https://github.com/lukasz-chase/truegrind",
    website: "https://wisielec-online.netlify.app/",
    kind: "project",
  },

  [MODAL_IDS.LUKASZVILE]: {
    title: "About Me",
    content:
      "Hi, I’m Łukasz Ścigaj – a full-stack TypeScript developer from Poland. I enjoy building playful frontends, solid APIs and everything in between. I like exercising - hence the bench, running and walking my dog, the one that follows you around (Malina).",
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
export const JUMP_HEIGHT = 16;

export const MODAL_INTERACTABLES = [
  { path: "/models/GoodBuilding.glb", modalId: MODAL_IDS.GOOD_BUILDING },
  {
    path: "/models/KoffeecupBuilding.glb",
    modalId: MODAL_IDS.KOFFEECUP_BUILDING,
  },
  { path: "/models/MupBuilding.glb", modalId: MODAL_IDS.MUP_BUILDING },
  { path: "/models/Lukaszvile.glb", modalId: MODAL_IDS.LUKASZVILE },
];

export const POSTER_INTERACTABLES = [
  { path: "/models/HangmanPoster.glb", modalId: MODAL_IDS.PROJECT_HANGMAN },
  {
    path: "/models/LukaszvilePoster.glb",
    modalId: MODAL_IDS.PROJECT_LUKASZVILE,
  },
  {
    path: "/models/TruegrindPoster.glb",
    modalId: MODAL_IDS.PROJECT_TRUEGRIND,
  },
];
export const LINKS_INTERACTABLES = [
  {
    path: "/models/LinkedinText.glb",
    tint: "#9bb8ff",
    href: "https://www.linkedin.com/in/lukasz-scigaj/",
    speed: 1.2,
  },
  {
    path: "/models/EmailText.glb",
    tint: "#ffe8a3",
    href: "mailto:lukasz.scigaj00@gmail.com",
    speed: 1,
  },
  {
    path: "/models/GithubText.glb",
    tint: "#d6c3ff",
    href: "https://github.com/lukasz-chase",
    speed: 1.5,
  },
];

export const WORLD_BOUNDS = {
  minX: -139.77,
  maxX: 136.86,
  minZ: -121.37,
  maxZ: 121.73,
};

export const PLAYER_INIT_POSITION = {
  x: 121,
  y: 1,
  z: 0,
};
export const DOG_INIT_POSITION = { x: 126, y: 2, z: -6 };

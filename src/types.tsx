import { MODAL_IDS } from "./constants";

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];

export type ModalKind = "project" | "experience" | "education" | "about";

export type ModalContent = {
  title: string;
  content?: string;
  techStack?: string[];
  github?: string;
  website?: string;
  kind: ModalKind;
  company?: string;
  period?: string;
  role?: string;
};

import { MODAL_IDS } from "./constants";

export type ModalId = (typeof MODAL_IDS)[keyof typeof MODAL_IDS];

export type ModalContent = {
  title: string;
  content: string;
  link?: string;
};

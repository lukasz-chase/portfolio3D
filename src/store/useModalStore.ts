import { create } from "zustand";
import { ModalContent, ModalId } from "../types";
import { MODAL_CONTENT } from "../constants";

type ModalState = {
  activeId: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
  content: ModalContent | null;
};

export const useModalStore = create<ModalState>((set, get) => ({
  activeId: null,
  openModal: (id) => set({ activeId: id }),
  closeModal: () => set({ activeId: null }),
  get content() {
    const id = get().activeId;
    return id ? MODAL_CONTENT[id] : null;
  },
}));

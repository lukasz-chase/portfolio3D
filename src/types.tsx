export type ModalId =
  | "Project_1"
  | "Project_2"
  | "Project_3"
  | "Chest"
  | "Picnic";

export type ModalContent = {
  title: string;
  content: string;
  link?: string;
};

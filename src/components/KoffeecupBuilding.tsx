import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";
import { useModalStore } from "../store/useModalStore";
import { MODAL_IDS } from "../constants";
import InteractiveModel from "./InteractiveModel";

const path = "/models/KoffeecupBuilding.glb";

const KoffeecupBuilding: React.FC = () => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <InteractiveModel
      path={path}
      onClick={() => openModal(MODAL_IDS.KOFFEECUP_BUILDING)}
    />
  );
};

export default KoffeecupBuilding;

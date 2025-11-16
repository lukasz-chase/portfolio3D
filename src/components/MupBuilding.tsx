import { useModalStore } from "../store/useModalStore";
import { MODAL_IDS } from "../constants";
import InteractiveModel from "./InteractiveModel";

const path = "/models/MupBuilding.glb";

const MupBuilding: React.FC = () => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <InteractiveModel
      path={path}
      onClick={() => openModal(MODAL_IDS.MUP_BUILDING)}
    />
  );
};

export default MupBuilding;

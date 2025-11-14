import { useModalStore } from "../store/useModalStore";
import { MODAL_IDS } from "../constants";
import InteractiveModel from "./InteractiveModel";

const path = "/models/GoodBuilding.glb";

const GoodBuilding: React.FC = () => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <InteractiveModel
      path={path}
      onClick={() => openModal(MODAL_IDS.GOOD_BUILDING)}
    />
  );
};

export default GoodBuilding;

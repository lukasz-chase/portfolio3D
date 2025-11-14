import { useModalStore } from "../store/useModalStore";
import { MODAL_IDS } from "../constants";
import InteractiveModel from "./InteractiveModel";

const path = "/models/TruegrindPoster.glb";

const TruegrindPoster: React.FC = () => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <InteractiveModel
      path={path}
      onClick={() => openModal(MODAL_IDS.PROJECT_TRUEGRIND)}
    />
  );
};

export default TruegrindPoster;

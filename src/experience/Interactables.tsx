import { useModalStore } from "../store/useModalStore";
import {
  LINKS_INTERACTABLES,
  MODAL_INTERACTABLES,
  POSTER_INTERACTABLES,
} from "../constants";
import Car from "../components/Car";
import CvText from "../components/CvText";
import Bench from "../components/Bench";
import InteractiveModel from "../components/InteractiveModel";
import { Float } from "@react-three/drei";

export const Interactables: React.FC = () => {
  const openModal = useModalStore((store) => store.openModal);

  return (
    <>
      <group>
        {MODAL_INTERACTABLES.map(({ path, modalId }) => (
          <InteractiveModel
            key={path}
            path={path}
            onClick={() => openModal(modalId)}
          />
        ))}
      </group>
      <group>
        {POSTER_INTERACTABLES.map(({ path, modalId }) => (
          <InteractiveModel
            key={path}
            path={path}
            onClick={() => openModal(modalId)}
          />
        ))}
      </group>
      <group>
        {LINKS_INTERACTABLES.map(({ path, tint, href }) => (
          <Float
            rotationIntensity={0}
            floatIntensity={10}
            floatingRange={[-0, 0.3]}
            key={path}
          >
            <InteractiveModel
              path={path}
              tint={tint}
              onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
            />
          </Float>
        ))}
        <CvText />
      </group>
      <Car />
      <Bench />
    </>
  );
};

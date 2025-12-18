import {
  EffectComposer,
  Outline,
  SMAA,
  selectionContext,
} from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { useContext } from "react";

const HighlightEffects: React.FC = () => {
  const selection = useContext(selectionContext);
  const hasSelection = (selection?.selected?.length ?? 0) > 0;

  return (
    <EffectComposer multisampling={0} autoClear={false}>
      {hasSelection ? (
        <Outline
          blur
          visibleEdgeColor={0xffffff}
          edgeStrength={1.5}
          kernelSize={KernelSize.SMALL}
        />
      ) : null}
      <SMAA />
    </EffectComposer>
  );
};

export default HighlightEffects;

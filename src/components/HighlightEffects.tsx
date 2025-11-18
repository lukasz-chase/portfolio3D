import { EffectComposer, Outline, SMAA } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

const HighlightEffects: React.FC = () => {
  return (
    <EffectComposer multisampling={8} autoClear={false}>
      <Outline
        blur
        visibleEdgeColor={0xffffff}
        edgeStrength={2}
        kernelSize={KernelSize.MEDIUM}
      />
      <SMAA />
    </EffectComposer>
  );
};

export default HighlightEffects;

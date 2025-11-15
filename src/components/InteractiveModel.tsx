import { useGLTF, useCursor } from "@react-three/drei";
import { useState, useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";
import type { ComponentProps } from "react";
import { useAudioStore } from "../store/useAudioStore";

type InteractiveModelProps = {
  path: string;
  onClick?: (event: any) => void;
} & Omit<ComponentProps<"primitive">, "object" | "onClick">;

const InteractiveModel: React.FC<InteractiveModelProps> = ({
  path,
  onClick,
  ...props
}) => {
  useGLTF.preload(path);
  const { scene } = useGLTF(path);
  const [hovered, setHovered] = useState(false);
  const playSound = useAudioStore((s) => s.playSound);

  useCursor(hovered && !!onClick);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  const handleOnClick = (e: any) => {
    if (onClick) {
      onClick(e);
    }
    playSound("interactionSFX");
  };

  return (
    <primitive
      object={clonedScene}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => (
        e.stopPropagation(), setHovered(true)
      )}
      onPointerOut={() => setHovered(false)}
      onClick={handleOnClick}
      {...props}
    />
  );
};

export default InteractiveModel;

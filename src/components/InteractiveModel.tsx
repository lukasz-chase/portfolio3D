import { useGLTF, useCursor } from "@react-three/drei";
import { useState, useMemo } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";
import type { ComponentProps } from "react";

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

  return (
    <primitive
      object={clonedScene}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => (
        e.stopPropagation(), setHovered(true)
      )}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      {...props}
    />
  );
};

export default InteractiveModel;

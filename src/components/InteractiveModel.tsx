import { useGLTF, useCursor } from "@react-three/drei";
import { useState, useMemo, forwardRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import type { GLTF } from "three-stdlib";
import { Group, Mesh } from "three";
import type { ComponentProps, ReactNode } from "react";
import { useAudioStore } from "../store/useAudioStore";
import * as THREE from "three";
import { SoundId } from "../types";

type InteractiveModelProps = {
  path: string;
  onClick?: (event: any) => void;
  children?: (scene: THREE.Group) => ReactNode;
  tint?: string;
  soundPath?: SoundId;
} & Omit<ComponentProps<"primitive">, "object" | "onClick">;

const InteractiveModel = forwardRef<Group, InteractiveModelProps>(
  (
    { path, onClick, tint, soundPath = "interactionSFX", children, ...props },
    ref
  ) => {
    useGLTF.preload(path);
    const { scene } = useGLTF(path) as GLTF;
    const [hovered, setHovered] = useState(false);
    const playSound = useAudioStore((s) => s.playSound);

    useCursor(hovered && !!onClick);

    const clonedScene = useMemo(() => {
      const clone = scene.clone();
      clone.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          if (tint) {
            const mat = mesh.material as THREE.MeshStandardMaterial;

            // Apply pastel tint
            mat.color = new THREE.Color(tint);
          }
        }
      });
      return clone;
    }, [scene, tint]);

    const handleOnClick = (e: any) => {
      e.stopPropagation();
      if (onClick) {
        // If a ref is forwarded, use its current value, otherwise use the event object.
        // This gives the parent component direct access to the model.
        const clickTarget =
          ref && "current" in ref && ref.current ? ref.current : e.eventObject;
        onClick(clickTarget);
      }
      playSound(soundPath);
    };

    if (children) {
      return children(clonedScene);
    }

    return (
      <primitive
        object={clonedScene}
        ref={ref}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => (
          e.stopPropagation(), setHovered(true)
        )}
        onPointerOut={() => setHovered(false)}
        onClick={handleOnClick}
        {...props}
      />
    );
  }
);

export default InteractiveModel;

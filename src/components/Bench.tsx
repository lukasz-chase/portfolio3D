import { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import gsap from "gsap";
import InteractiveModel from "./InteractiveModel";
import { usePlayerStore } from "../store/usePlayerStore";
import { useShallow } from "zustand/shallow";

const path = "/models/Bench.glb";

const Bench: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    setTeleportTo,
    setIsUsingBench,
    hasMovedFromBench,
    setHasMovedFromBench,
  } = usePlayerStore(
    useShallow((s) => ({
      setTeleportTo: s.setTeleportTo,
      setIsUsingBench: s.setIsUsingBench,
      hasMovedFromBench: s.hasMovedFromBench,
      setHasMovedFromBench: s.setHasMovedFromBench,
    }))
  );

  const currentAnimation = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    if (isAnimating && hasMovedFromBench) {
      if (currentAnimation.current) {
        currentAnimation.current.currentLabel("finish");
        currentAnimation.current = null;
      }
    }
  }, [hasMovedFromBench, isAnimating]);

  const onClick = (benchModel: Group) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsUsingBench(true);

    const weightBar = benchModel.getObjectByName("Weight_bar");
    const weightBench = benchModel.getObjectByName("Weight_bench");
    if (!weightBar || !weightBench) return;

    const benchWorldPos = new Vector3();
    weightBench.getWorldPosition(benchWorldPos);

    const targetPos: Vector3 = benchWorldPos.clone();

    targetPos.y += 2;
    targetPos.z += 4;

    setTeleportTo({ x: targetPos.x, y: targetPos.y, z: targetPos.z });
    const tl = gsap.timeline({
      onComplete: () => {
        setIsUsingBench(false);
        setIsAnimating(false);
        setHasMovedFromBench(false);
      },
    });
    currentAnimation.current = tl;
    const initialZ = weightBar.position.z;
    const initialY = weightBar.position.y;
    const liftHeight = initialY + 2;

    tl.to(weightBar.position, {
      y: liftHeight,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.to(weightBar.position, {
      z: initialZ + 3,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.to(weightBar.position, {
      y: initialY,
      duration: 0.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: 3,
    });
    tl.to(weightBar.position, {
      z: initialZ,
      duration: 0.5,
      ease: "power1.inOut",
    });
    tl.to(
      weightBar.position,
      {
        y: initialY,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "finish"
    );
  };

  return (
    <InteractiveModel path={path} onClick={onClick} soundPath="benchSFX" />
  );
};

export default Bench;

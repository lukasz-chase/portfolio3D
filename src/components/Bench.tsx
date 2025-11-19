import { useState } from "react";
import { Group } from "three";
import gsap from "gsap";
import InteractiveModel from "./InteractiveModel";

const path = "/models/Bench.glb";

const Bench: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const onClick = (benchModel: Group) => {
    if (isAnimating) return;

    const weightBar = benchModel.getObjectByName("Weight_bar");
    if (!weightBar) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
      },
    });

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
    tl.to(weightBar.position, {
      y: initialY,
      duration: 0.5,
      ease: "power1.inOut",
    });
  };

  return (
    <InteractiveModel path={path} onClick={onClick} soundPath="benchSFX" />
  );
};

export default Bench;

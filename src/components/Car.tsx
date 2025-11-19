import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import InteractiveModel from "./InteractiveModel";

const Car = () => {
  const carBody = useRef<RapierRigidBody>(null);

  const carGoesBrrr = () => {
    carBody.current?.setLinvel({ x: 0, y: 20, z: -20 }, true);
  };

  return (
    <RigidBody
      ref={carBody}
      type="dynamic"
      colliders="hull"
      mass={10000}
      friction={2}
    >
      <InteractiveModel
        path="/models/Car.glb"
        soundPath={"carSFX"}
        onClick={carGoesBrrr}
      />
    </RigidBody>
  );
};

export default Car;

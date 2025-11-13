import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";

const Dog: React.FC = () => {
  const { scene } = useGLTF("/models/Dog.glb");

  const initPosition = { x: 122, y: 2, z: 5 };
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const isOnFloorRef = useRef(false);

  // clone Character mesh for the RigidBody
  const characterMesh = useMemo(() => {
    console.log(scene);
    const clone = scene.children[0].clone(true);
    clone.position.set(0, 0, 0);
    clone.rotation.set(Math.PI, 0, 0);
    return clone;
  }, [scene]);

  useFrame(() => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();

    // Respawn if falling
    if (translation.y < -20) {
      body.setTranslation(initPosition, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  if (!characterMesh) return null;
  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      mass={1}
      position={[initPosition.x, initPosition.y, initPosition.z]}
      enabledRotations={[false, false, false]}
      linearDamping={1.5}
      friction={1}
      onCollisionEnter={() => {
        isOnFloorRef.current = true;
      }}
      onCollisionExit={() => {
        isOnFloorRef.current = false;
      }}
    >
      <CuboidCollider args={[3, 6, 1.5]} position={[0, 2, 0]} />
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

export default Dog;

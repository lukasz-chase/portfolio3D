import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  RigidBody,
  RapierRigidBody,
  CuboidCollider,
} from "@react-three/rapier";
import * as THREE from "three";
import { useShallow } from "zustand/shallow";
import { usePlayerStore } from "../store/usePlayerStore";
import { JUMP_HEIGHT, MOVE_SPEED } from "../constants";
import { useGameStore } from "../store/useGameStore";

const Dog: React.FC = () => {
  const { scene } = useGLTF("/models/Dog.glb");
  const { playerPosition, playerHasMoved } = usePlayerStore(
    useShallow((s) => ({
      playerPosition: s.position,
      playerHasMoved: s.hasMoved,
    }))
  );
  const { moveSpeed, jumpHeight } = useGameStore(
    useShallow((s) => ({ moveSpeed: s.moveSpeed, jumpHeight: s.jumpHeight }))
  );

  const initPosition = { x: 122, y: 2, z: 5 };
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const isOnFloorRef = useRef(false);
  const movementDirection = useRef(new THREE.Vector3());
  const randomFactor = useRef(0);
  const lastRandomUpdate = useRef(0);
  const targetYawRef = useRef(0);

  const characterMesh = useMemo(() => {
    const clone = scene.children[0].clone(true);
    clone.position.set(0, 2, 0);
    clone.rotation.set(Math.PI, 0, 0);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    const body = bodyRef.current;
    if (!body || !playerHasMoved) return;

    const translation = body.translation();
    const dogPosition = new THREE.Vector3(
      translation.x,
      translation.y,
      translation.z
    );

    const directionToPlayer = new THREE.Vector3().subVectors(
      playerPosition,
      dogPosition
    );

    // Update random factor periodically
    if (state.clock.elapsedTime - lastRandomUpdate.current > 1) {
      randomFactor.current = (Math.random() - 0.5) * 2; // -1 to 1
      lastRandomUpdate.current = state.clock.elapsedTime;
    }
    // Follow player if not too close
    if (directionToPlayer.length() > 9) {
      const desiredDirection = directionToPlayer.clone().normalize();

      if (isOnFloorRef.current) {
        body.setLinvel({ x: 0, y: JUMP_HEIGHT * jumpHeight, z: 0 }, true);
      }
      // Add some randomness to the path
      const sideways = new THREE.Vector3(
        -desiredDirection.z,
        0,
        desiredDirection.x
      );
      desiredDirection.add(sideways.multiplyScalar(randomFactor.current * 0.4));

      // Smoothly change direction
      movementDirection.current.lerp(desiredDirection, delta * 2);

      body.setLinvel(
        {
          x: movementDirection.current.x * MOVE_SPEED * moveSpeed,
          y: body.linvel().y,
          z: movementDirection.current.z * MOVE_SPEED * moveSpeed,
        },
        true
      );

      // Rotate dog to face movement direction
      targetYawRef.current = Math.atan2(
        movementDirection.current.x,
        movementDirection.current.z
      );
      const q = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetYawRef.current + Math.PI / 2, 0)
      );
      body.setRotation(q, true);
    } else {
      // Stop moving if close to the player
      // Apply strong damping to halt movement quickly
      const linvel = body.linvel();
      body.setLinvel(
        { x: linvel.x * 0.8, y: linvel.y, z: linvel.z * 0.8 },
        true
      );
      // Reset the movement direction to prevent sudden lurches
      movementDirection.current.set(0, 0, 0);
    }

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
      <CuboidCollider args={[3, 6, 1.5]} position={[0, 4, 0]} />
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

export default Dog;

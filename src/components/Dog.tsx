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
import { DOG_INIT_POSITION, JUMP_HEIGHT, MOVE_SPEED } from "../constants";
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

  const bodyRef = useRef<RapierRigidBody | null>(null);
  const isOnFloorRef = useRef(false);
  const movementDirection = useRef(new THREE.Vector3());
  const randomFactor = useRef(0);
  const lastRandomUpdate = useRef(0);
  const targetYawRef = useRef(0);

  const dogPosRef = useRef(new THREE.Vector3());
  const directionToPlayerRef = useRef(new THREE.Vector3());
  const desiredDirectionRef = useRef(new THREE.Vector3());
  const sidewaysRef = useRef(new THREE.Vector3());
  const targetEulerRef = useRef(new THREE.Euler());
  const targetQuatRef = useRef(new THREE.Quaternion());
  const tmpLinvelRef = useRef({ x: 0, y: 0, z: 0 });

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
    const dogPosition = dogPosRef.current.set(
      translation.x,
      translation.y,
      translation.z
    );

    const directionToPlayer = directionToPlayerRef.current.set(
      playerPosition.x - dogPosition.x,
      playerPosition.y - dogPosition.y,
      playerPosition.z - dogPosition.z
    );

    // Update random factor periodically
    if (state.clock.elapsedTime - lastRandomUpdate.current > 1) {
      randomFactor.current = (Math.random() - 0.5) * 2; // -1 to 1
      lastRandomUpdate.current = state.clock.elapsedTime;
    }
    // Follow player if not too close
    if (directionToPlayer.length() > 9) {
      const desiredDirection = desiredDirectionRef.current
        .copy(directionToPlayer)
        .normalize();

      if (isOnFloorRef.current) {
        const lv = tmpLinvelRef.current;
        lv.x = 0;
        lv.y = JUMP_HEIGHT * jumpHeight;
        lv.z = 0;
        body.setLinvel(lv, true);
      }
      // Add some randomness to the path
      sidewaysRef.current.set(-desiredDirection.z, 0, desiredDirection.x);
      desiredDirection.add(
        sidewaysRef.current.multiplyScalar(randomFactor.current * 0.4)
      );

      // Smoothly change direction
      const dirAlpha = 1 - Math.exp(-2 * delta);
      movementDirection.current.lerp(desiredDirection, dirAlpha);

      const lv = tmpLinvelRef.current;
      lv.x = movementDirection.current.x * MOVE_SPEED * moveSpeed;
      lv.y = body.linvel().y;
      lv.z = movementDirection.current.z * MOVE_SPEED * moveSpeed;
      body.setLinvel(lv, true);

      // Rotate dog to face movement direction
      targetYawRef.current = Math.atan2(
        movementDirection.current.x,
        movementDirection.current.z
      );
      targetEulerRef.current.set(0, targetYawRef.current + Math.PI / 2, 0);
      targetQuatRef.current.setFromEuler(targetEulerRef.current);
      body.setRotation(targetQuatRef.current, true);
    } else {
      // Stop moving if close to the player
      // Apply strong damping to halt movement quickly
      const linvel = body.linvel();
      const damping = Math.exp(-14 * delta);
      const lv = tmpLinvelRef.current;
      lv.x = linvel.x * damping;
      lv.y = linvel.y;
      lv.z = linvel.z * damping;
      body.setLinvel(
        lv,
        true
      );
      // Reset the movement direction to prevent sudden lurches
      movementDirection.current.set(0, 0, 0);
    }

    // Respawn if falling
    if (translation.y < -20) {
      body.setTranslation(DOG_INIT_POSITION, true);
      const lv = tmpLinvelRef.current;
      lv.x = 0;
      lv.y = 0;
      lv.z = 0;
      body.setLinvel(lv, true);
    }
  });

  if (!characterMesh) return null;
  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      mass={1}
      position={[DOG_INIT_POSITION.x, DOG_INIT_POSITION.y, DOG_INIT_POSITION.z]}
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

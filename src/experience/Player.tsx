// src/experience/Player.tsx
import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import usePhysicsStore from "../store/usePhysicsStore";
import { useInputStore } from "../store/useInputStore";
import { useAudioStore } from "../store/useAudioStore";

const GRAVITY = 30;
const CAPSULE_RADIUS = 0.35;
const CAPSULE_HEIGHT = 1;
const JUMP_HEIGHT = 11;
const MOVE_SPEED = 7;

export const Player: React.FC = () => {
  const { camera, scene } = useThree();

  const colliderOctree = usePhysicsStore((s) => s.colliderOctree);
  const spawnPosition = usePhysicsStore((s) => s.spawnPosition);
  const setSpawnPosition = usePhysicsStore((s) => s.setSpawnPosition);

  const pressed = useInputStore((s) => s.pressed);

  const isMuted = useAudioStore((s) => s.isMuted);
  const playSound = useAudioStore((s) => s.playSound);

  const characterRef = useRef<THREE.Object3D | null>(null);
  const colliderRef = useRef<Capsule | null>(null);
  const velocityRef = useRef(new THREE.Vector3());
  const onFloorRef = useRef(false);
  const targetRotationRef = useRef(-Math.PI / 2);
  const isMovingRef = useRef(false);
  const cameraOffset = useRef(new THREE.Vector3(98, 50, 30));

  // 1) Attach to the Character in the GLTF scene
  useEffect(() => {
    const character = scene.getObjectByName("Character");

    if (!character) {
      console.warn(
        "Character object not found in GLTF (name must be 'Character')."
      );
      return;
    }

    characterRef.current = character;

    // If we don't yet have a spawnPosition in the store, derive it from the GLTF
    if (!spawnPosition) {
      const pos = (character as THREE.Mesh).position.clone();
      setSpawnPosition(pos);

      const start = pos.clone().add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));
      const end = pos.clone().add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));

      colliderRef.current = new Capsule(start, end, CAPSULE_RADIUS);
    } else {
      // spawnPosition already set from elsewhere (if you ever do that), use it
      const start = spawnPosition
        .clone()
        .add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));
      const end = spawnPosition
        .clone()
        .add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));

      colliderRef.current = new Capsule(start, end, CAPSULE_RADIUS);
      character.position.copy(spawnPosition);
    }
  }, [scene, spawnPosition, setSpawnPosition]);

  const respawn = () => {
    const character = characterRef.current;
    const collider = colliderRef.current;
    const spawn = usePhysicsStore.getState().spawnPosition; // latest value

    if (!character || !collider || !spawn) return;

    collider.start.copy(spawn).add(new THREE.Vector3(0, CAPSULE_RADIUS, 0));
    collider.end.copy(spawn).add(new THREE.Vector3(0, CAPSULE_HEIGHT, 0));

    velocityRef.current.set(0, 0, 0);
    isMovingRef.current = false;

    character.position.copy(spawn);
  };

  const applyCollisions = () => {
    const collider = colliderRef.current;
    if (!collider || !colliderOctree) return;

    const result = colliderOctree.capsuleIntersect(collider);
    onFloorRef.current = false;

    if (result) {
      onFloorRef.current = result.normal.y > 0;
      collider.translate(result.normal.multiplyScalar(result.depth));

      if (onFloorRef.current) {
        isMovingRef.current = false;
        velocityRef.current.x = 0;
        velocityRef.current.z = 0;
      }
    }
  };

  const handleMovementInput = () => {
    const collider = colliderRef.current;
    if (!collider) return;
    if (isMovingRef.current) return;
    if (!Object.values(pressed).some(Boolean)) return;

    const vel = velocityRef.current;

    if (!isMuted) {
      playSound("jumpSFX");
    }

    if (pressed.up) {
      vel.z -= MOVE_SPEED;
      targetRotationRef.current = Math.PI;
    }
    if (pressed.down) {
      vel.z += MOVE_SPEED;
      targetRotationRef.current = 0;
    }
    if (pressed.left) {
      vel.x -= MOVE_SPEED;
      targetRotationRef.current = -Math.PI / 2;
    }
    if (pressed.right) {
      vel.x += MOVE_SPEED;
      targetRotationRef.current = Math.PI / 2;
    }

    vel.y = JUMP_HEIGHT;
    isMovingRef.current = true;
  };

  useFrame((_, delta) => {
    const character = characterRef.current;
    const collider = colliderRef.current;
    if (!character || !collider) return;

    const vel = velocityRef.current;
    const dt = Math.min(delta, 0.035);

    if (character.position.y < -20) {
      respawn();
      return;
    }

    if (!onFloorRef.current) {
      vel.y -= GRAVITY * dt;
    }

    handleMovementInput();

    collider.translate(vel.clone().multiplyScalar(dt));
    applyCollisions();

    character.position.copy(collider.start);
    character.position.y -= CAPSULE_RADIUS;

    const currentRot = character.rotation.y;
    const targetRot = targetRotationRef.current;
    const rotationDiff =
      ((((targetRot - currentRot) % (2 * Math.PI)) + 3 * Math.PI) %
        (2 * Math.PI)) -
      Math.PI;

    const finalRot = currentRot + rotationDiff;
    character.rotation.y = THREE.MathUtils.lerp(currentRot, finalRot, 0.4);

    const offset = cameraOffset.current;
    const targetCameraPosition = new THREE.Vector3(
      character.position.x + offset.x - 20,
      offset.y,
      character.position.z + offset.z + 30
    );

    camera.position.lerp(targetCameraPosition, 0.1);
    camera.lookAt(
      character.position.x + 10,
      camera.position.y - 39,
      character.position.z + 10
    );
  });

  // Character is already part of the GLTF tree from <World />, so we render nothing here.
  return null;
};

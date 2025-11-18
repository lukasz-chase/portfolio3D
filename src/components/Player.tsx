import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useAudioStore } from "../store/useAudioStore";
import { useInputStore } from "../store/useInputStore";
import { useShallow } from "zustand/shallow";
import { usePlayerStore } from "../store/usePlayerStore";
import { JUMP_HEIGHT, MOVE_SPEED } from "../constants";
import { useGameStore } from "../store/useGameStore";

export const Player: React.FC = () => {
  const { camera } = useThree();
  const { scene } = useGLTF("/models/Character.glb");

  const { setPlayerPosition, playerHasMoved, setHasMoved } = usePlayerStore(
    useShallow((s) => ({
      setPlayerPosition: s.setPosition,
      playerHasMoved: s.hasMoved,
      setHasMoved: s.setHasMoved,
    }))
  );
  const { isMuted, playSound } = useAudioStore();
  const { moveSpeed, jumpHeight } = useGameStore(
    useShallow((s) => ({ moveSpeed: s.moveSpeed, jumpHeight: s.jumpHeight }))
  );

  const bodyRef = useRef<RapierRigidBody | null>(null);
  const targetYawRef = useRef(-Math.PI / 2);
  const isOnFloorRef = useRef(false);
  const stuckFramesRef = useRef(0);

  const initPosition = { x: 121, y: 1, z: 0 };

  const [, getKeys] = useKeyboardControls();
  const virtual = useInputStore((s) => s.pressed);

  const characterMesh = useMemo(() => {
    const clone = scene.children[0].clone(true);
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, targetYawRef.current, 0);

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    return clone;
  }, [scene]);

  useFrame(() => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();
    const linvel = body.linvel();

    setPlayerPosition(translation.x, translation.y, translation.z);

    const { forward, backward, leftward, rightward } = getKeys();

    const up = forward || virtual.up;
    const down = backward || virtual.down;
    const left = leftward || virtual.left;
    const right = rightward || virtual.right;

    const dir = new THREE.Vector3(0, 0, 0);
    if (up) {
      dir.x -= 1;
      targetYawRef.current = -Math.PI / 2;
    }
    if (down) {
      dir.x += 1;
      targetYawRef.current = Math.PI / 2;
    }
    if (left) {
      dir.z += 1;
      targetYawRef.current = 0;
    }
    if (right) {
      dir.z -= 1;
      targetYawRef.current = Math.PI;
    }

    const hasInput = dir.lengthSq() > 0;

    // --- FLOOR DETECTION (no collisions needed) ---
    // road is a bit lower than grass, hence the loose 1.5 threshold
    const ON_FLOOR_Y = 1.5;
    const VY_EPS = 0.2; // "almost not moving vertically"
    const onFloor = translation.y < ON_FLOOR_Y && Math.abs(linvel.y) < VY_EPS;
    isOnFloorRef.current = onFloor;

    // --- STUCK DETECTION (pressing into something) ---
    const horizSpeed = Math.hypot(linvel.x, linvel.z);
    const STUCK_SPEED_EPS = 0.25;
    const STUCK_FRAMES = 3;

    if (hasInput && onFloor && horizSpeed < STUCK_SPEED_EPS) {
      stuckFramesRef.current += 1;
    } else {
      stuckFramesRef.current = 0;
    }

    const isStuck = stuckFramesRef.current >= STUCK_FRAMES;
    // -------------------------------------------------

    if (hasInput) {
      if (!playerHasMoved) setHasMoved();

      dir.normalize();

      const baseX = dir.x * MOVE_SPEED * moveSpeed;
      const baseZ = dir.z * MOVE_SPEED * moveSpeed;
      let vy = linvel.y;

      // pogo jump: only while grounded and not stuck
      if (onFloor && !isStuck) {
        if (!isMuted) playSound("jumpSFX");
        vy = JUMP_HEIGHT * jumpHeight;
      }

      body.setLinvel({ x: baseX, y: vy, z: baseZ }, true);

      const MODEL_YAW_OFFSET = Math.PI / 2;
      const q = body.rotation();
      const curQ = new THREE.Quaternion(q.x, q.y, q.z, q.w);
      const targetQ = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetYawRef.current + MODEL_YAW_OFFSET, 0)
      );

      curQ.slerp(targetQ, 0.2);
      body.setRotation({ x: curQ.x, y: curQ.y, z: curQ.z, w: curQ.w }, true);
    } else {
      body.setLinvel(
        { x: linvel.x * 0.9, y: linvel.y, z: linvel.z * 0.9 },
        true
      );
    }

    body.setAngvel({ x: 0, y: 0, z: 0 }, true);

    const camTarget = new THREE.Vector3(
      translation.x + 98 - 20,
      50,
      translation.z + 25
    );
    camera.position.lerp(camTarget, 0.1);
    camera.lookAt(
      translation.x + 10,
      camera.position.y - 39,
      translation.z + 5
    );

    if (translation.y < -20) {
      body.setTranslation(initPosition, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  if (!characterMesh) return null;

  return (
    <RigidBody
      ref={bodyRef}
      colliders="cuboid"
      mass={1}
      position={[initPosition.x, initPosition.y, initPosition.z]}
      enabledRotations={[false, false, false]}
      linearDamping={1.5}
      friction={1}
    >
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useAudioStore } from "../store/useAudioStore";
import { useInputStore } from "../store/useInputStore";
import { useShallow } from "zustand/shallow";
import { usePlayerStore } from "../store/usePlayerStore";
import { JUMP_HEIGHT, MOVE_SPEED, PLAYER_INIT_POSITION } from "../constants";
import { useGameStore } from "../store/useGameStore";

export const Player: React.FC = () => {
  const { camera } = useThree();
  const { scene } = useGLTF("/models/Character.glb");

  const {
    setPlayerPosition,
    playerHasMoved,
    setHasMoved,
    teleportTo,
    setTeleportTo,
    isUsingBench,
    setHasMovedFromBench,
    hasMovedFromBench,
  } = usePlayerStore(
    useShallow((s) => ({
      setPlayerPosition: s.setPosition,
      playerHasMoved: s.hasMoved,
      setHasMoved: s.setHasMoved,
      teleportTo: s.teleportTo,
      setTeleportTo: s.setTeleportTo,
      isUsingBench: s.isUsingBench,
      setHasMovedFromBench: s.setHasMovedFromBench,
      hasMovedFromBench: s.hasMovedFromBench,
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
  const lastPosSentTimeRef = useRef(0);
  const lastPosSentRef = useRef({
    x: PLAYER_INIT_POSITION.x,
    y: PLAYER_INIT_POSITION.y,
    z: PLAYER_INIT_POSITION.z,
  });

  const dirRef = useRef(new THREE.Vector3());
  const camTargetRef = useRef(new THREE.Vector3());
  const benchEulerRef = useRef(new THREE.Euler());
  const benchQuatRef = useRef(new THREE.Quaternion());
  const curQuatRef = useRef(new THREE.Quaternion());
  const targetEulerRef = useRef(new THREE.Euler());
  const targetQuatRef = useRef(new THREE.Quaternion());
  const tmpLinvelRef = useRef({ x: 0, y: 0, z: 0 });
  const tmpAngvelRef = useRef({ x: 0, y: 0, z: 0 });

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

  useFrame((state, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    if (teleportTo) {
      body.setTranslation(teleportTo, true);
      const lv = tmpLinvelRef.current;
      lv.x = 0;
      lv.y = 0;
      lv.z = 0;
      body.setLinvel(lv, true);
      setPlayerPosition(teleportTo.x, teleportTo.y, teleportTo.z);
      lastPosSentRef.current = {
        x: teleportTo.x,
        y: teleportTo.y,
        z: teleportTo.z,
      };
      lastPosSentTimeRef.current = state.clock.elapsedTime;
      setTeleportTo(null);
    }

    const translation = body.translation();

    // Avoid writing to zustand every frame (reduces React/zustand churn).
    // Keep the store fresh enough for proximity/interaction checks.
    const POSITION_SEND_HZ = 15;
    const MIN_SEND_INTERVAL = 1 / POSITION_SEND_HZ;
    const elapsed = state.clock.elapsedTime;
    if (elapsed - lastPosSentTimeRef.current >= MIN_SEND_INTERVAL) {
      const last = lastPosSentRef.current;
      const dx = translation.x - last.x;
      const dy = translation.y - last.y;
      const dz = translation.z - last.z;
      if (dx * dx + dy * dy + dz * dz > 0.01 * 0.01) {
        setPlayerPosition(translation.x, translation.y, translation.z);
        lastPosSentRef.current = {
          x: translation.x,
          y: translation.y,
          z: translation.z,
        };
      }
      lastPosSentTimeRef.current = elapsed;
    }

    if (teleportTo && isUsingBench) {
      benchEulerRef.current.set(-Math.PI / 2, Math.PI / 2, 0); // lying on the bench
      benchQuatRef.current.setFromEuler(benchEulerRef.current);
      body.setRotation(benchQuatRef.current, true);

      const camTarget = camTargetRef.current.set(
        translation.x + 98 - 20,
        50,
        translation.z + 25
      );
      const camAlpha = 1 - Math.exp(-6.6 * delta);
      camera.position.lerp(camTarget, camAlpha);
      camera.lookAt(
        translation.x + 10,
        camera.position.y - 39,
        translation.z + 5
      );

      return;
    }

    const linvel = body.linvel();
    const { forward, backward, leftward, rightward } = getKeys();

    const up = forward || virtual.up;
    const down = backward || virtual.down;
    const left = leftward || virtual.left;
    const right = rightward || virtual.right;

    const dir = dirRef.current.set(0, 0, 0);
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
    if (up || down || right || left) {
      if (isUsingBench && !hasMovedFromBench) {
        setHasMovedFromBench(true);
      }
    }
    const hasInput = dir.lengthSq() > 0;

    const ON_FLOOR_Y = 1.5;
    const VY_EPS = 0.2; // "almost not moving vertically"
    const onFloor = translation.y < ON_FLOOR_Y && Math.abs(linvel.y) < VY_EPS;
    isOnFloorRef.current = onFloor;

    // --- STUCK DETECTION (pressing into something) ---
    const horizSpeed = Math.hypot(linvel.x, linvel.z);
    const STUCK_SPEED_EPS = 0.25;
    const STUCK_FRAMES = 2;

    if (hasInput && onFloor && horizSpeed < STUCK_SPEED_EPS) {
      stuckFramesRef.current += 1;
    } else {
      stuckFramesRef.current = 0;
    }

    const isStuck = stuckFramesRef.current >= STUCK_FRAMES;

    if (hasInput) {
      if (!playerHasMoved) setHasMoved();

      dir.normalize();

      const baseX = dir.x * MOVE_SPEED * moveSpeed;
      const baseZ = dir.z * MOVE_SPEED * moveSpeed;
      let vy = linvel.y;

      if (onFloor && !isStuck) {
        if (!isMuted) playSound("jumpSFX");
        vy = JUMP_HEIGHT * jumpHeight;
      }

      const lv = tmpLinvelRef.current;
      lv.x = baseX;
      lv.y = vy;
      lv.z = baseZ;
      body.setLinvel(lv, true);

      const MODEL_YAW_OFFSET = Math.PI / 2;
      const q = body.rotation();
      curQuatRef.current.set(q.x, q.y, q.z, q.w);
      targetEulerRef.current.set(
        0,
        targetYawRef.current + MODEL_YAW_OFFSET,
        0
      );
      targetQuatRef.current.setFromEuler(targetEulerRef.current);

      const rotAlpha = 1 - Math.exp(-20 * delta); // increased responsiveness
      curQuatRef.current.slerp(targetQuatRef.current, rotAlpha);
      body.setRotation(curQuatRef.current, true);
    } else {
      const damping = Math.exp(-10 * delta); // slightly faster damping
      const lv = tmpLinvelRef.current;
      lv.x = linvel.x * damping;
      lv.y = linvel.y;
      lv.z = linvel.z * damping;
      body.setLinvel(
        lv,
        true
      );
    }

    const av = tmpAngvelRef.current;
    av.x = 0;
    av.y = 0;
    av.z = 0;
    body.setAngvel(av, true);

    const camTarget = camTargetRef.current.set(
      translation.x + 98 - 20,
      50,
      translation.z + 25
    );
    const camAlpha = 1 - Math.exp(-10 * delta); // Smoother camera lerp, more consistent across framerates
    camera.position.lerp(camTarget, camAlpha);
    camera.lookAt(
      translation.x + 10,
      camera.position.y - 39,
      translation.z + 5
    );

    if (translation.y < -20) {
      body.setTranslation(PLAYER_INIT_POSITION, true);
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
      colliders="cuboid"
      mass={1}
      position={[
        PLAYER_INIT_POSITION.x,
        PLAYER_INIT_POSITION.y,
        PLAYER_INIT_POSITION.z,
      ]}
      enabledRotations={[false, true, false]}
      linearDamping={1.5}
      friction={1}
    >
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

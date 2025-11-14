import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useAudioStore } from "../store/useAudioStore";
import { useInputStore } from "../store/useInputStore";
import { useShallow } from "zustand/shallow";
import { usePlayerStore } from "../store/usePlayerStore";
import { useControls } from "leva";
import { JUMP_SPEED, MOVE_SPEED } from "../constants";

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

  const { moveSpeed, jumpSpeed } = useControls("Player", {
    moveSpeed: { value: MOVE_SPEED, min: 0, max: 100, step: 1 },
    jumpSpeed: { value: JUMP_SPEED, min: 0, max: 100, step: 1 },
  });

  const bodyRef = useRef<RapierRigidBody | null>(null);
  const targetYawRef = useRef(-Math.PI / 2);
  const isOnFloorRef = useRef(false);
  const initPosition = {
    x: 121,
    y: 2,
    z: -4,
  };

  const [, getKeys] = useKeyboardControls();
  const virtual = useInputStore((s) => s.pressed);

  // clone Character mesh for the RigidBody
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
    setPlayerPosition(translation.x, translation.y, translation.z);

    const linvel = body.linvel();

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

    if (hasInput) {
      if (!playerHasMoved) {
        setHasMoved();
      }

      dir.normalize();

      // Base horizontal velocity
      const baseX = dir.x * moveSpeed;
      const baseZ = dir.z * moveSpeed;
      let vy = linvel.y; // keep current vertical velocitysd

      // Jump while moving & grounded (your current behaviour)
      if (isOnFloorRef.current) {
        if (!isMuted) playSound("jumpSFX");
        vy = jumpSpeed;
      }

      body.setLinvel({ x: baseX, y: vy, z: baseZ }, true);

      // Rotate towards target yaw
      const MODEL_YAW_OFFSET = Math.PI / 2; // mesh pre-rotated -PI/2 in GLB
      const q = body.rotation();
      const curQ = new THREE.Quaternion(q.x, q.y, q.z, q.w);
      const targetQ = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetYawRef.current + MODEL_YAW_OFFSET, 0)
      );

      // slerp along shortest arc
      curQ.slerp(targetQ, 0.2);
      body.setRotation({ x: curQ.x, y: curQ.y, z: curQ.z, w: curQ.w }, true);
    } else {
      // No input: small damping so we don't slide forever
      body.setLinvel(
        { x: linvel.x * 0.9, y: linvel.y, z: linvel.z * 0.9 },
        true
      );
    }

    // Kill unwanted spinning
    body.setAngvel({ x: 0, y: 0, z: 0 }, true);

    // Camera follow
    const camTarget = new THREE.Vector3(
      translation.x + 98 - 20,
      50,
      translation.z + 30
    );
    camera.position.lerp(camTarget, 0.1);
    camera.lookAt(
      translation.x + 10,
      camera.position.y - 39,
      translation.z + 10
    );

    // Respawn if falling
    if (translation.y < -20) {
      body.setTranslation(initPosition, true);
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  const handleCollisionEnter = () => {
    const translation = bodyRef.current?.translation();
    if (translation!.y < 1.5) {
      isOnFloorRef.current = true;
    }
  };

  if (!characterMesh) return null;

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      mass={1}
      position={[initPosition.x, initPosition.y, initPosition.z]}
      enabledRotations={[false, false, false]}
      linearDamping={1.5}
      friction={1}
      onCollisionEnter={handleCollisionEnter}
      onCollisionExit={() => {
        isOnFloorRef.current = false;
      }}
    >
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";
import { useInputStore } from "../store/useInputStore";
import { useAudioStore } from "../store/useAudioStore";

const MOVE_SPEED = 15;
const JUMP_SPEED = 14;

type PortfolioGLTF = {
  scene: THREE.Group;
};

export const Player: React.FC = () => {
  const { camera } = useThree();
  const { scene } = useGLTF(
    "/models/Portfolio.glb"
  ) as unknown as PortfolioGLTF;

  const pressed = useInputStore((s) => s.pressed);
  const isMuted = useAudioStore((s) => s.isMuted);
  const playSound = useAudioStore((s) => s.playSound);
  const bodyRef = useRef<RapierRigidBody | null>(null);
  const targetYawRef = useRef(-Math.PI / 2);
  // clone Character mesh for the RigidBody
  const characterMesh = useMemo(() => {
    const original = scene.getObjectByName(
      "Character"
    ) as THREE.Object3D | null;
    if (!original) {
      console.warn("Character not found in GLTF (name must be 'Character').");
      return null;
    }
    const clone = original.clone(true);
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, targetYawRef.current, 0);
    return clone;
  }, [scene]);

  // original character world position (spawn)
  const characterOrigin = useMemo(() => {
    const original = scene.getObjectByName(
      "Character"
    ) as THREE.Object3D | null;
    if (!original) return new THREE.Vector3(0, 3, 0);
    return original.getWorldPosition(new THREE.Vector3());
  }, [scene]);

  const isOnFloorRef = useRef(false);

  useFrame(() => {
    const body = bodyRef.current;
    if (!body) return;

    const translation = body.translation();
    const linvel = body.linvel();

    // Direction from input
    const dir = new THREE.Vector3(0, 0, 0);
    if (pressed.up) {
      dir.x -= 1;
      targetYawRef.current = -Math.PI / 2;
    }
    if (pressed.down) {
      dir.x += 1;
      targetYawRef.current = Math.PI / 2;
    }
    if (pressed.left) {
      dir.z += 1;
      targetYawRef.current = 0;
    }
    if (pressed.right) {
      dir.z -= 1;
      targetYawRef.current = Math.PI;
    }

    const hasInput = dir.lengthSq() > 0;

    if (hasInput) {
      dir.normalize();

      // Base horizontal velocity
      const baseX = dir.x * MOVE_SPEED;
      const baseZ = dir.z * MOVE_SPEED;
      let vy = linvel.y; // start from current vertical velocity

      // Jump ONCE when starting to move on the floor
      if (isOnFloorRef.current) {
        if (!isMuted) playSound("jumpSFX");
        vy = JUMP_SPEED;
      }

      body.setLinvel({ x: baseX, y: vy, z: baseZ }, true);
      const MODEL_YAW_OFFSET = Math.PI / 2; // because mesh is pre-rotated -PI/2

      // Read current yaw from the body's quaternion
      const q = body.rotation();
      const curQ = new THREE.Quaternion(q.x, q.y, q.z, q.w);

      const targetQ = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetYawRef.current + MODEL_YAW_OFFSET, 0)
      );

      // slerp along the shortest arc
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
      body.setTranslation(
        {
          x: characterOrigin.x,
          y: characterOrigin.y + 2,
          z: characterOrigin.z,
        },
        true
      );
      body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  if (!characterMesh) return null;

  return (
    <RigidBody
      ref={bodyRef}
      colliders="ball"
      mass={1}
      position={[characterOrigin.x, characterOrigin.y + 2, characterOrigin.z]}
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
      <primitive object={characterMesh} castShadow receiveShadow />
    </RigidBody>
  );
};

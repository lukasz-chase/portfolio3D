import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { World } from "./World";
import { Player } from "./Player";
import { Interactables } from "./Interactables";
import { LoadingScreen } from "../ui/LoadingScreen";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import ControlsOverlay from "../ui/ControlsOverlay";

const Experience: React.FC = () => {
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["ShiftLeft", "ShiftRight"] },
      ]}
    >
      <Canvas
        orthographic
        shadows
        camera={{
          position: [98, 50, 30],
          zoom: 20,
          near: 1,
          far: 1000,
        }}
        gl={{ antialias: true }}
        onCreated={(state) => {
          const { gl } = state;
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.7;
        }}
      >
        <color attach="background" args={["#aec972"]} />

        <directionalLight
          castShadow
          position={[280, 200, -80]}
          intensity={1}
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-left={-150}
          shadow-camera-right={300}
          shadow-camera-top={150}
          shadow-camera-bottom={-100}
        />
        <ambientLight intensity={2.7} />

        <Suspense fallback={<LoadingScreen />}>
          <Physics gravity={[0, -40, 0]}>
            <World />
            <Player />
            <Interactables />
          </Physics>
        </Suspense>
      </Canvas>
      <ControlsOverlay />
    </KeyboardControls>
  );
};

export default Experience;

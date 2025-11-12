import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { World } from "./World";
import { Player } from "./Player";
import { Interactables } from "./Interactables";
import { LoadingScreen } from "../ui/LoadingScreen";
const Experience: React.FC = () => {
  return (
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
        <World />
        <Player />
        <Interactables />
      </Suspense>
    </Canvas>
  );
};

export default Experience;

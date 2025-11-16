import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { World } from "./World";
import { Player } from "../components/Player";
import { Interactables } from "./Interactables";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
import ControlsOverlay from "../ui/ControlsOverlay/ControlsOverlay";
import Dog from "../components/Dog";
import Colliders from "../components/Colliders";
import { Perf } from "r3f-perf";
import { Lights } from "./Lights";
import { useGameStore } from "../store/useGameStore";
import LoadingScreen from "../ui/LoadingScreen/LoadingScreen";

const Experience: React.FC = () => {
  const [zoom, setZoom] = useState(20);
  const hasStarted = useGameStore((s) => s.hasStarted);

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;

      if (width < 400) setZoom(9);
      else if (width < 768) setZoom(13);
      else if (width < 1024) setZoom(15);
      else setZoom(20);
    };

    updateZoom(); // run on load
    window.addEventListener("resize", updateZoom);

    return () => window.removeEventListener("resize", updateZoom);
  }, []);

  return (
    <>
      <LoadingScreen />
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
            zoom: zoom,
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
          <Perf position="top-left" />
          <color attach="background" args={["#3C9330"]} />
          <OrbitControls />
          <Lights />
          <Suspense fallback={null}>
            {hasStarted && (
              <Physics gravity={[0, -40, 0]}>
                <World />
                <Player />
                <Dog />
                <Colliders />
                <Interactables />
              </Physics>
            )}
          </Suspense>
        </Canvas>
        {hasStarted && <ControlsOverlay />}
      </KeyboardControls>
    </>
  );
};

export default Experience;

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeStore } from "../store/useThemeStore";

const dayAmbientColor = new THREE.Color(1.0, 1.0, 1.0);
const nightAmbientColor = new THREE.Color(0.25, 0.31, 0.78);

const daySunColor = new THREE.Color(1.0, 0.98, 0.92); // warmish white
const nightSunColor = new THREE.Color(0.8, 0.85, 1.0); // slightly cooler

export const Lights: React.FC = () => {
  const isDark = useThemeStore((s) => s.isDark);
  const ambientRef = useRef<THREE.AmbientLight | null>(null);
  const sunRef = useRef<THREE.DirectionalLight | null>(null);

  useFrame(() => {
    const ambient = ambientRef.current;
    const sun = sunRef.current;
    if (!ambient || !sun) return;

    const targetAmbientIntensity = isDark ? 1.0 : 1.9;
    const targetSunIntensity = isDark ? 1.0 : 2.5;

    ambient.intensity = THREE.MathUtils.lerp(
      ambient.intensity,
      targetAmbientIntensity,
      0.1
    );
    sun.intensity = THREE.MathUtils.lerp(
      sun.intensity,
      targetSunIntensity,
      0.1
    );

    const targetAmbColor = isDark ? nightAmbientColor : dayAmbientColor;
    const targetSunCol = isDark ? nightSunColor : daySunColor;

    ambient.color.lerp(targetAmbColor, 0.1);
    sun.color.lerp(targetSunCol, 0.1);
  });

  return (
    <>
      <directionalLight
        ref={sunRef}
        castShadow
        position={[200, 200, -40]}
        intensity={1}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-left={-250}
        shadow-camera-right={300}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
        shadow-normalBias={0.2}
        shadow-bias={-0.0005}
      />
      <ambientLight ref={ambientRef} intensity={0.9} />
    </>
  );
};

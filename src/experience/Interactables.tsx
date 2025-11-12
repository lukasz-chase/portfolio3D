// src/experience/Interactables.tsx
import React, { useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useModalStore } from "../store/useModalStore";
import { useAudioStore } from "../store/useAudioStore";
import { ModalId } from "../types";

const POKEMON_NAMES = [
  "Bulbasaur",
  "Chicken",
  "Pikachu",
  "Charmander",
  "Squirtle",
  "Snorlax",
];
const PROJECT_NAMES: ModalId[] = [
  "Project_1",
  "Project_2",
  "Project_3",
  "Chest",
  "Picnic",
];

export const Interactables: React.FC = () => {
  const { scene, gl, camera } = useThree();
  const openModal = useModalStore((s) => s.openModal);
  const playSound = useAudioStore((s) => s.playSound);
  const isMuted = useAudioStore((s) => s.isMuted);

  const raycaster = React.useRef(new THREE.Raycaster());
  const pointer = React.useRef(new THREE.Vector2());
  const intersectedRef = React.useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent | TouchEvent) => {
      let clientX: number;
      let clientY: number;

      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event.touches[0]) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        return;
      }

      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleClick = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();

      raycaster.current.setFromCamera(pointer.current, camera);

      const clickable: THREE.Object3D[] = [];
      PROJECT_NAMES.concat(POKEMON_NAMES as ModalId[]).forEach((name) => {
        const obj = scene.getObjectByName(name);
        if (obj) clickable.push(obj);
      });

      const intersects = raycaster.current.intersectObjects(clickable, true);
      if (intersects.length === 0) return;

      const obj = intersects[0].object.parent ?? intersects[0].object;
      const name = obj.name;

      if (POKEMON_NAMES.includes(name)) {
        if (!isMuted) playSound("pokemonSFX");
        const originalY = obj.position.y;
        const jumpHeight = 2;
        const jumpDuration = 0.5;

        gsap
          .timeline()
          .to(obj.position, {
            y: originalY + jumpHeight,
            duration: jumpDuration * 0.5,
            ease: "power2.out",
          })
          .to(obj.position, {
            y: originalY,
            duration: jumpDuration * 0.5,
            ease: "bounce.out",
          });
      } else if (PROJECT_NAMES.includes(name as ModalId)) {
        openModal(name as ModalId);
        if (!isMuted) playSound("projectsSFX");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("click", handleClick, { passive: false });
    window.addEventListener("touchend", handleClick, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchend", handleClick);
    };
  }, [camera, scene, isMuted, openModal, playSound]);

  useFrame(() => {
    raycaster.current.setFromCamera(pointer.current, camera);

    const clickable: THREE.Object3D[] = [];
    PROJECT_NAMES.concat(POKEMON_NAMES as ModalId[]).forEach((name) => {
      const obj = scene.getObjectByName(name);
      if (obj) clickable.push(obj);
    });

    const intersects = raycaster.current.intersectObjects(clickable, true);
    if (intersects.length > 0) {
      document.body.style.cursor = "pointer";
      intersectedRef.current =
        intersects[0].object.parent ?? intersects[0].object;
    } else {
      document.body.style.cursor = "default";
      intersectedRef.current = null;
    }
  });

  return null;
};

// components/Selection.tsx
import { Api } from "@react-three/postprocessing/src/Selection";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { selectionContext, SelectApi } from "@react-three/postprocessing";
import * as THREE from "three";
import { usePlayerStore } from "../store/usePlayerStore";

export const selectContext = /* @__PURE__ */ createContext<Api | null>(null);

export function ModifiedSelect({
  enabled = false,
  children,
  ...props
}: SelectApi) {
  const group = useRef<THREE.Group>(null!);
  const api = useContext(selectContext);

  useEffect(() => {
    if (api && enabled) {
      let changed = false;
      const current: THREE.Object3D[] = [];
      group.current.traverse((o) => {
        if (o.type === "Mesh") {
          current.push(o);
        }
        if (api.selected.indexOf(o) === -1) changed = true;
      });

      if (changed) {
        api.select((state) => [...state, ...current]);

        return () => {
          api.select((state) =>
            state.filter((selected) => !current.includes(selected))
          );
        };
      }
    }
  }, [enabled, children, api]);

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  );
}

export function ModifiedSelection({
  children,
  enabled = true,
}: {
  enabled?: boolean;
  children: React.ReactNode;
}) {
  const [selected, select] = useState<THREE.Object3D[]>([]);
  const selectApiRef = useRef({ selected, select, enabled });
  const selectApi = selectApiRef.current;

  selectApi.selected = selected;
  selectApi.select = select;
  selectApi.enabled = enabled;

  const selectionApi = useMemo(
    () => ({ selected, select, enabled }),
    [selected, select, enabled]
  );

  return (
    <selectContext.Provider value={selectApiRef.current}>
      <selectionContext.Provider value={selectionApi}>
        {children}
      </selectionContext.Provider>
    </selectContext.Provider>
  );
}

/** NEW: only selects object when player is within `radius` */
type ProximitySelectProps = SelectApi & {
  radius?: number;
};

export const ProximitySelect: React.FC<ProximitySelectProps> = ({
  enabled = true,
  radius = 45,
  children,
  ...props
}) => {
  const group = useRef<THREE.Group>(null!);
  const api = useContext(selectContext);
  const playerPos = usePlayerStore((s) => s.position);

  const centerRef = useRef<THREE.Vector3 | null>(null);
  const [isNear, setIsNear] = useState(false);

  // compute center once models are loaded
  useEffect(() => {
    if (!group.current) return;
    const box = new THREE.Box3().setFromObject(group.current);
    const center = new THREE.Vector3();
    box.getCenter(center);
    centerRef.current = center;
  }, [children]);

  // recompute proximity when player moves
  useEffect(() => {
    if (!centerRef.current) return;
    const player = new THREE.Vector3(playerPos.x, playerPos.y, playerPos.z);
    const dist = player.distanceTo(centerRef.current);
    const next = dist < radius;
    setIsNear((prev) => (prev === next ? prev : next));
  }, [playerPos, radius]);

  const effectiveEnabled = enabled && isNear;

  useEffect(() => {
    if (api && effectiveEnabled) {
      let changed = false;
      const current: THREE.Object3D[] = [];
      group.current.traverse((o) => {
        if (o.type === "Mesh") current.push(o);
        if (api.selected.indexOf(o) === -1) changed = true;
      });

      if (changed) {
        api.select((state) => [...state, ...current]);
        return () => {
          api.select((state) =>
            state.filter((selected) => !current.includes(selected))
          );
        };
      }
    }
  }, [effectiveEnabled, children, api]);

  return (
    <group ref={group} {...props}>
      {children}
    </group>
  );
};

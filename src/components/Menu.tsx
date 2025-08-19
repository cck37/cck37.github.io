import React, { useRef } from "react";
import * as THREE from "three";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Orb } from "./Orb";
import { useBouncingOrbAnimation } from "../hooks/useBouncingOrbAnimation";
import { orbIndexToStart } from "../utils";
import { PS2Blue } from "../constants";

const circleCenter = new THREE.Vector3(-5, 0, 0);
const circleRadius = 5;

const startingOrbs = Array.from({ length: 7 }, (_, i) => ({
  // position in a circle around the center
  position: new THREE.Vector3(...orbIndexToStart(i, circleRadius)),
  key: i,
}));

const BouncingOrbs = () => {
  // TODO: Reduce deps and useMemoize this
  const orbRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Object3D>(null);
  let allOrbState: "moveTowards" | "moveAway" | "moving" = "moveTowards";
  let prevAllOrbState: "moveTowards" | "moveAway" | "moving" = "moveAway";
  let orbsState = startingOrbs.map((orb) => ({ ...orb, state: "moving" }));
  let chasePatternIndex = 0;

  useBouncingOrbAnimation(
    orbRefs,
    groupRef,
    pivotRef,
    chasePatternIndex,
    allOrbState,
    orbsState,
    startingOrbs,
    prevAllOrbState,
    circleRadius
  );

  return (
    <object3D ref={pivotRef} position={circleCenter}>
      <group ref={groupRef}>
        {startingOrbs.map((orb) => (
          <Orb
            key={orb.key}
            color={new THREE.Color(PS2Blue)}
            position={orb.position}
            scale={[0.3, 0.3, 0.3]}
            castShadow
            receiveShadow
            ref={(el: THREE.Mesh | null) => {
              if (el) {
                orbRefs.current[orb.key] = el;
              }
            }}
          />
        ))}
      </group>
    </object3D>
  );
};

export const Menu: React.FC = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      <EffectComposer>
        <Bloom
          intensity={10}
          kernelSize={4}
          luminanceThreshold={0.001}
          luminanceSmoothing={1}
        />
      </EffectComposer>
      <ambientLight intensity={0.8} />
      <BouncingOrbs />

      <Html>
        <div className="menu">
          <div className="menu-items">
            <li className="menu-item">Browser</li>
            <li
              className="menu-item"
              onClick={() =>
                window.open("https://github.com/cck37/cck37.github.io")
              }
            >
              System Information
            </li>
          </div>
        </div>
      </Html>
    </>
  );
};

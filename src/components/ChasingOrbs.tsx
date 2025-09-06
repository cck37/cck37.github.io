import { useRef } from "react";
import * as THREE from "three";
import {
  CIRCLE_CENTER,
  CIRCLE_RADIUS,
  ORB_COLOR,
  STARTING_ORBS,
} from "../scenes/Menu/constants";

import { Orb } from "./Orb";
import { useChasingOrbAnimation } from "../scenes/Menu/hooks/useChasingOrbAnimation";

export const ChasingOrbs = () => {
  // TODO: Reduce deps and useMemoize this
  const orbRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Object3D>(null);
  let allOrbState: "moveTowards" | "moveAway" | "moving" = "moveTowards";
  let prevAllOrbState: "moveTowards" | "moveAway" | "moving" = "moveAway";
  let orbsState = STARTING_ORBS.map((orb) => ({ ...orb, state: "moving" }));
  let chasePatternIndex = 0;

  useChasingOrbAnimation(
    orbRefs,
    groupRef,
    pivotRef,
    chasePatternIndex,
    allOrbState,
    orbsState,
    STARTING_ORBS,
    prevAllOrbState,
    CIRCLE_RADIUS
  );

  return (
    <object3D ref={pivotRef} position={CIRCLE_CENTER}>
      <group ref={groupRef}>
        {STARTING_ORBS.map((orb) => (
          <Orb
            key={orb.key}
            color={ORB_COLOR}
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

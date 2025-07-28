import React, { type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { chasePatterns } from "../utils";

const chaseSpeed = 0.01;
const rotationSpeed = 2;

const chasePatternArrayLength = chasePatterns.length;

// TODO: Refactor to just me more legible
export function useBouncingOrbAnimation(
  orbRefs: RefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >[]
  >,
  groupRef: React.RefObject<THREE.Group<THREE.Object3DEventMap> | null>,
  pivotRef: React.RefObject<THREE.Object3D<THREE.Object3DEventMap> | null>,
  chasePatternIndex: number,
  allOrbState: string,
  orbsState: {
    state: string;
    // position in a circle around the center
    position: THREE.Vector3;
    key: number;
  }[],
  startingOrbs: {
    position: THREE.Vector3;
    key: number;
  }[],
  prevAllOrbState: string,
  circleRadius: number
) {
  useFrame(({ clock }) => {
    if (!orbRefs.current) return;
    if (!groupRef.current) return;
    if (!pivotRef.current) return;

    /**
     * There are four parts to this animation:
     * 1. Each orb rotating around a circle
     * 2. All orbs moinvg up and down collecively
     * 3. All orbs rotate around the x-axis of the circle
     * 4. Each orb chasing each other into groups of 2, 4, and 7
     */
    orbRefs.current.forEach((orb, index) => {
      // for each orb, decide if it should move
      if (chasePatterns[chasePatternIndex].hasOwnProperty(index)) {
        // if moving, find nearest pair
        const targetOrb =
          orbRefs.current[chasePatterns[chasePatternIndex][index]];
        if (!targetOrb) return;

        const currentAngle = Math.atan2(orb.position.y, orb.position.x);
        if (allOrbState === "moveTowards") {
          if (orbsState[index].state !== "atTarget") {
            orbsState[index].state = "movingTowards"; // reset state to moving if not at target
            const targetAngle = Math.atan2(
              targetOrb.position.y,
              targetOrb.position.x
            );
            let angularDistance = targetAngle - currentAngle;
            if (chasePatternIndex === 0) {
              angularDistance -= 2 * Math.PI; // first and last patterns should always move clockwise
            } else {
              if (angularDistance > Math.PI) angularDistance -= 2 * Math.PI;
              if (angularDistance < -Math.PI) angularDistance += 2 * Math.PI;
            }

            const step = Math.sign(angularDistance) * chaseSpeed;
            const newAngle = currentAngle + step;
            orb.position.x = circleRadius * Math.cos(newAngle);
            orb.position.y = circleRadius * Math.sin(newAngle);

            if (orb.position.distanceTo(targetOrb.position) < 0.1) {
              orbsState[index].state = "atTarget";
            }
          }
        } else if (allOrbState === "moveAway") {
          if (orbsState[index].state !== "atStart") {
            orbsState[index].state = "movingAway"; // reset state to moving if not at target
            const targetOrb = startingOrbs[index];

            const targetAngle = Math.atan2(
              targetOrb.position.y,
              targetOrb.position.x
            );
            let angularDistance = targetAngle - currentAngle;
            if (chasePatternIndex === 0) {
              angularDistance -= 2 * Math.PI; // first and last patterns should always move clockwise
            } else {
              if (angularDistance > Math.PI) angularDistance -= 2 * Math.PI;
              if (angularDistance < -Math.PI) angularDistance += 2 * Math.PI;
            }
            const step = Math.sign(angularDistance) * chaseSpeed;
            const newAngle = currentAngle + step;
            orb.position.x = circleRadius * Math.cos(newAngle);
            orb.position.y = circleRadius * Math.sin(newAngle);

            if (orb.position.distanceTo(startingOrbs[index].position) < 0.1) {
              orbsState[index].state = "atStart";
            }
          }
        }
      } else {
        orbsState[index].state = "static";
      }
    });

    if (
      orbsState.every(
        (orb) => orb.state === "atTarget" || orb.state === "static"
      )
    ) {
      prevAllOrbState = allOrbState;
      allOrbState = "moveAway";
    } else if (
      orbsState.every(
        (orb) => orb.state === "atStart" || orb.state === "static"
      )
    ) {
      prevAllOrbState = allOrbState;
      allOrbState = "moveTowards";
    }

    if (allOrbState !== prevAllOrbState && allOrbState === "moveTowards") {
      chasePatternIndex = (chasePatternIndex + 1) % chasePatternArrayLength;
      prevAllOrbState = allOrbState;
    }

    // 1. Rotate each orb around a circle
    // 3. All orbs rotate around the x and z-axis of the circle
    pivotRef.current.rotation.x = clock.getElapsedTime() * rotationSpeed;
    pivotRef.current.rotation.z = clock.getElapsedTime() * rotationSpeed;
  });
  return { chasePatternIndex, allOrbState, prevAllOrbState };
}

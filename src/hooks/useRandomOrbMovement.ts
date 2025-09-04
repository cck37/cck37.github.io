import React, { type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// TODO: This has side effects... Oh well
export function useRandomOrbMovement(
  orbsRef: RefObject<THREE.Mesh[]>,
  randomPositions: THREE.Vector3[]
) {
  const randPos = new THREE.Vector3();
  useFrame(() => {
    if (!orbsRef.current) return;
    // Move to a random position no more than 3 units away. If at that random position, move to a new one
    orbsRef.current.forEach((orb) => {
      if (!orb) return;
      const currentPosition = orb.position;
      const targetPosition = randomPositions[orbsRef.current.indexOf(orb)];
      const distance = currentPosition.distanceTo(targetPosition);
      if (distance < 1) {
        randomPositions[orbsRef.current.indexOf(orb)] = randPos.set(
          Math.random() * 10 - 5, // Random x between -10 and 10
          Math.random() * 10 - 5,
          orb.position.z // Keep the z position the same
        );
      }
      // Move towards the target position using lerp
      orb.position.lerp(targetPosition, 0.005); // Adjust the lerp factor for speed
    });
  });
}

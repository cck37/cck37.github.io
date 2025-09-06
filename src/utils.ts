import * as THREE from "three";

export const getRandomPositions = (
  spheres: { color: string; pos: THREE.Vector3 }[]
) =>
  Array.from({ length: spheres.length || 0 }, () => {
    const z = spheres[0].pos.z;
    const randomX = randomCapped(-10, 10, false); // Random x between -10 and 10
    const randomY = randomCapped(-10, 10, false); // Random x between -10 and 10
    return new THREE.Vector3(randomX, randomY, z);
  });

export const randomCapped = (
  min: number,
  max: number,
  decimal: boolean = true
) => {
  return decimal
    ? Math.floor(Math.random() * (max - min)) + min
    : Math.random() * (max - min) + min;
};

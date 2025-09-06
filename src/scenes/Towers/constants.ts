import { randomCapped } from "../../utils";
import { darken, lighten, mainGray } from "../../utils/colorUtils";
import * as THREE from "three";

export const SPOT_LIGHT_COLOR = lighten(mainGray, 0.4);
export const CLOUD_COLOR = "#132c56";

export const ROWS = 14;
export const X_GAP = 1.3;
export const Y_GAP = 1.3;

export const TOWERS_TO_NOT_DRAW = [
  2, 3, 4, 5, 7, 11, 12, 14, 15, 16, 23, 24, 25, 28, 29, 31, 32, 33, 36, 39, 43,
  49, 50, 53, 56, 67, 69, 74, 76, 79, 81, 82, 83, 88, 90, 91, 92, 93, 94, 97,
  98, 99, 100, 101, 102, 104, 106, 107, 111, 112,
];

export const SPHERES = [
  {
    pos: new THREE.Vector3(randomCapped(-5, -1), randomCapped(1, 5), 6),
    color: "green",
  },
  {
    pos: new THREE.Vector3(randomCapped(1, 5), randomCapped(-5, -1), 6),
    color: "red",
  },
  {
    pos: new THREE.Vector3(randomCapped(-5, -1), randomCapped(-5, -1), 6),
    color: "blue",
  },
  {
    pos: new THREE.Vector3(randomCapped(1, 5), randomCapped(1, 5), 6),
    color: "magenta",
  },
];

export const TOWERS = Array.from({ length: 112 }, (_, i) => ({
  pos: new THREE.Vector3(
    (i % ROWS) * X_GAP - (ROWS / 2) * X_GAP,
    Math.floor(i / ROWS) * Y_GAP - (112 / ROWS / 2) * Y_GAP,
    Math.random() * (2 - 0) * -1
  ),
  color: darken(mainGray, randomCapped(0.55, 1, false)),
})).filter((_, index) => !TOWERS_TO_NOT_DRAW.includes(index + 1));

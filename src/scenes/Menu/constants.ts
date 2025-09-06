import * as THREE from "three";
import { chasePatterns, orbIndexToStart } from "./utils";
import { PS2Blue } from "../../utils/colorUtils";

export const CIRCLE_CENTER = new THREE.Vector3(-5, 0, 0);
export const CIRCLE_RADIUS = 5;

export const STARTING_ORBS = Array.from({ length: 7 }, (_, i) => ({
  // position in a circle around the center
  position: new THREE.Vector3(...orbIndexToStart(i, CIRCLE_RADIUS)),
  key: i,
}));

export const ORB_COLOR = new THREE.Color(PS2Blue);

export const CHASE_SPEED = 0.01;
export const ROTATION_SPEED = 2;

export const CHASE_PATTERN_LENGTH = chasePatterns.length;

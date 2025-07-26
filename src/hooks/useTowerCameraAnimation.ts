import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const useTowerCameraAnimation = () => {
  let animationComplete = false;
  const zCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, 20),
    new THREE.Vector3(0, 0, 20),
    new THREE.Vector3(0, 0, 20),
    new THREE.Vector3(0, 0, 3)
  );
  const xCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0, THREE.MathUtils.degToRad(-5)),
    new THREE.Vector3(0, 0, THREE.MathUtils.degToRad(-5)),
    new THREE.Vector3(0, 0, THREE.MathUtils.degToRad(-5)),
    new THREE.Vector3(0, 0, THREE.MathUtils.degToRad(90))
  );
  useFrame(({ camera }) => {
    if (animationComplete) return;
    const time = performance.now() * 0.0001;

    const zPoint = zCurve.getPoint(time % 1);
    camera.position.set(zPoint.x, zPoint.y, zPoint.z);

    const xPoint = xCurve.getPoint(time % 1);
    camera.rotation.z = xPoint.z;

    if (zPoint.z <= 3.1) {
      animationComplete = true;
      return;
    }
  });
};

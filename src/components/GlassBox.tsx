import { useRef } from "react";
import { lighten, mainGray } from "../utils/colorUtils";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const GlassBox = (props: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomRateMod = Math.random() * (0.75 - 0.3) + 0.3;
  const boxColor = lighten(mainGray, 0.6);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (delta / 3) * randomRateMod;
      meshRef.current.rotation.y += (delta / 3) * randomRateMod;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={boxColor}
        roughness={0}
        transmission={1}
        thickness={2}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
};

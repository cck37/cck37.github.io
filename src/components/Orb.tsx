import React, { forwardRef } from "react";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { PS2Blue } from "../constants";

export const Orb = forwardRef<
  THREE.Mesh,
  { color?: THREE.Color } & JSX.IntrinsicElements["mesh"]
>((props, ref) => {
  const { color = new THREE.Color(PS2Blue), ...meshProps } = props;

  return (
    <Trail
      width={4} // Width of the line
      color={color} // Color of the line
      length={0.7} // Length of the line
      decay={2} // How fast the line fades away
      local={false} // Wether to use the target's world or local positions
      stride={0} // Min distance between previous and current point
      interval={1} // Number of frames to wait before next calculation
      target={undefined} // Optional target. This object will produce the trail.
      attenuation={(width) => width} // A function to define the width in each point along it.
    >
      <mesh {...meshProps} ref={ref}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
    </Trail>
  );
});

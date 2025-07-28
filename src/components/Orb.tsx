import React, { forwardRef, type JSX } from "react";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { PS2Blue } from "../constants";

// TODO: Make more configurable
export const Orb = forwardRef<
  THREE.Mesh,
  { color?: THREE.Color; flat?: Boolean } & JSX.IntrinsicElements["mesh"]
>((props, ref) => {
  const {
    color = new THREE.Color(PS2Blue),
    flat = false,
    ...meshProps
  } = props;

  return (
    <Trail
      width={1} // Width of the line
      color={color} // Color of the line
      length={2} // Length of the line
      decay={3} // How fast the line fades away
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
          color={flat ? "black" : ""}
        />
      </mesh>
    </Trail>
  );
});

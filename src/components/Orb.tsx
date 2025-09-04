import React, { forwardRef, type JSX } from "react";
import { Trail } from "@react-three/drei";
import { MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { PS2Blue } from "../constants";
import { extend, type ThreeElement } from "@react-three/fiber";

extend({ MeshLineMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

// TODO: Make more configurable
export const Orb = forwardRef<
  THREE.Mesh,
  {
    color?: THREE.Color;
    emissiveIntensity?: number;
    flat?: Boolean;
  } & JSX.IntrinsicElements["mesh"]
>((props, ref) => {
  const {
    color = new THREE.Color(PS2Blue),
    emissiveIntensity = 10,
    flat = false,
    ...meshProps
  } = props;

  return (
    <Trail
      width={20} // line width
      length={5} // number of points
      decay={1} // how fast the trail fades
      stride={0.01} // min distance between samples
      interval={1} // frames between samples
      color={color} // trail color
      attenuation={(w) => w * 0.5} // optional width attenuation
    >
      <mesh {...meshProps} ref={ref}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          toneMapped={false}
          color={flat ? "black" : ""}
        />
      </mesh>
      {/* @ts-ignore: Because of how meshLine is being extended, TS is expecting args. However, when provided, three complains that it doesn't take args */}
      <meshLineMaterial
        color={color}
        transparent
        depthWrite={false}
        opacity={0.01}
      />
    </Trail>
  );
});

import type { CanvasProps } from "@react-three/fiber";
import * as THREE from "three";

export const canvasProps: CanvasProps = {
  dpr: [1, 1.5],
  gl: {
    antialias: false, // This alone increases performance by like 20 frames on slower hardware
    powerPreference: "high-performance",
    alpha: false,
    stencil: false,
  },
  onCreated: ({ gl }) => {
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping;
  },
};

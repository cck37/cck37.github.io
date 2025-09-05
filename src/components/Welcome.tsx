import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Menu } from "./Menu";
import { StartingGrid } from "./StartingGrid";
import {
  isTowerAnimationFinished,
  isTowerAnimationNearlyFinished,
} from "../animationStore";
import { useStore } from "@nanostores/react";
import { AdaptiveDpr, AdaptiveEvents, Stats } from "@react-three/drei";
import * as THREE from "three";

const canvasProps: CanvasProps = {
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

const Welcome = () => {
  const $isTowerAnimationFinished = useStore(isTowerAnimationFinished);
  const $isTowerAnimationNearlyFinished = useStore(
    isTowerAnimationNearlyFinished
  );
  return (
    <>
      {$isTowerAnimationFinished ? (
        <div className="fade-in">
          <Canvas {...canvasProps}>
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <Menu />
          </Canvas>
        </div>
      ) : (
        <div
          className={$isTowerAnimationNearlyFinished ? "fade-out" : "fade-in"}
        >
          <Canvas {...canvasProps}>
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <StartingGrid />
          </Canvas>
        </div>
      )}
      <Stats showPanel={0} className="stats-top-left" />
    </>
  );
};

export default Welcome;

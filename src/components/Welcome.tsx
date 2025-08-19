import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Menu } from "./Menu";
import { StartingGrid } from "./StartingGrid";
import {
  isTowerAnimationFinished,
  isTowerAnimationNearlyFinished,
} from "../animationStore";
import { useStore } from "@nanostores/react";

const Welcome = () => {
  const $isTowerAnimationFinished = useStore(isTowerAnimationFinished);
  const $isTowerAnimationNearlyFinished = useStore(
    isTowerAnimationNearlyFinished
  );
  return (
    <>
      {$isTowerAnimationFinished ? (
        <div className="fade-in">
          <Canvas flat linear>
            <Menu />
          </Canvas>
        </div>
      ) : (
        <div
          className={$isTowerAnimationNearlyFinished ? "fade-out" : "fade-in"}
        >
          <Canvas>
            <StartingGrid />
          </Canvas>
        </div>
      )}
    </>
  );
};

export default Welcome;

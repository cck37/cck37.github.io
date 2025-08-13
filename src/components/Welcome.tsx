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
    <div className={"container"}>
      {$isTowerAnimationFinished ? (
        <div className="fade-in">
          <Canvas>
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
    </div>
  );
};

export default Welcome;

import { Canvas } from "@react-three/fiber";
import { Menu } from "./Menu";
import { StartingGrid } from "./StartingGrid";
import {
  isTowerAnimationFinished,
  isTowerAnimationNearlyFinished,
} from "../animationStore";
import { useStore } from "@nanostores/react";
import { Stats } from "@react-three/drei";

const Welcome = () => {
  const $isTowerAnimationFinished = useStore(isTowerAnimationFinished);
  const $isTowerAnimationNearlyFinished = useStore(
    isTowerAnimationNearlyFinished
  );
  return (
    <>
      {$isTowerAnimationFinished ? (
        <div className="fade-in">
          <Canvas flat linear dpr={[1, 1.5]}>
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
      <Stats showPanel={0} className="stats-top-left" />
    </>
  );
};

export default Welcome;

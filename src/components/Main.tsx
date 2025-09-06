import { Menu } from "../scenes/Menu/Menu";
import { TowersScene } from "../scenes/Towers/TowersScene";
import { useStore } from "@nanostores/react";
import { Stats } from "@react-three/drei";
import {
  isTowerAnimationFinished,
  isTowerAnimationNearlyFinished,
} from "../animationStore";
import { FadeCanvas } from "./Canvas";

const Main = () => {
  // Show the fade before we switch two the menu scene
  const $isTowerAnimationFinished = useStore(isTowerAnimationFinished);
  const $isTowerAnimationNearlyFinished = useStore(
    isTowerAnimationNearlyFinished
  );

  return (
    <>
      {!$isTowerAnimationFinished ? (
        <FadeCanvas isFadingOut={$isTowerAnimationNearlyFinished}>
          <TowersScene />
        </FadeCanvas>
      ) : (
        <FadeCanvas isFadingOut={false}>
          <Menu />
        </FadeCanvas>
      )}
      {/* <Stats showPanel={0} className="stats-top-left" /> */}
    </>
  );
};

export default Main;

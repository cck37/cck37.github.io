import { Menu } from "../scenes/Menu/Menu";
import { TowersScene } from "../scenes/Towers/TowersScene";
import { useStore } from "@nanostores/react";
import { Stats } from "@react-three/drei";
import { FadeCanvas } from "./Canvas";
import { commitTransition, currentScreen } from "../stores/navigationStore";
import { BrowseScreen } from "../scenes/BrowseScreen/BrowseScreen";
import { isTransitioning } from "../stores/navigationStore";

const Main = () => {
  const $currentScreen = useStore(currentScreen);
  const $isTransitioning = useStore(isTransitioning);

  return (
    <>
      <FadeCanvas
        isFadingOut={$isTransitioning}
        onFadeOutEnd={commitTransition}
      >
        {$currentScreen === "tower" ? (
          <TowersScene />
        ) : $currentScreen === "browse" ? (
          <BrowseScreen />
        ) : (
          <Menu />
        )}
      </FadeCanvas>
      <Stats showPanel={0} className="stats-top-left" />
    </>
  );
};

export default Main;

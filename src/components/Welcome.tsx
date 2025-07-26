import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Menu } from "./Menu";
import { StartingGrid } from "./StartingGrid";

const FADE_OUT_DURATION = 1000; // 1 second
const FADE_IN_DELAY = 6500; // 5 seconds

const Welcome = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeInMenu, setFadeInMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out transition
      setTimeout(() => {
        setShowMenu(true); // Render the next scene after fade-out
        setFadeInMenu(true); // Start fade-in transition for the menu
      }, FADE_OUT_DURATION); // Duration of fade-out transition
    }, FADE_IN_DELAY); // Transition after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={"container"}>
      {showMenu ? (
        <div
          aria-hidden={!showMenu}
          className={fadeInMenu ? "fade-in" : "fade-out"}
        >
          <Canvas>
            <Menu />
          </Canvas>
        </div>
      ) : (
        <div
          aria-hidden={showMenu}
          className={fadeOut ? "fade-out" : "fade-in"}
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

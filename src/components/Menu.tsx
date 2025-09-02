import React, { useRef } from "react";
import * as THREE from "three";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Orb } from "./Orb";
import { useBouncingOrbAnimation } from "../hooks/useBouncingOrbAnimation";
import { orbIndexToStart } from "../utils";
import { PS2Blue } from "../constants";
import resume from "../assets/resume.pdf";
import { Instances, Instance } from "@react-three/drei";

const circleCenter = new THREE.Vector3(-5, 0, 0);
const circleRadius = 5;

const startingOrbs = Array.from({ length: 7 }, (_, i) => ({
  // position in a circle around the center
  position: new THREE.Vector3(...orbIndexToStart(i, circleRadius)),
  key: i,
}));

const BouncingOrbs = () => {
  // TODO: Reduce deps and useMemoize this
  const orbRefs = useRef<THREE.Mesh[]>([]);
  const groupRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Object3D>(null);
  let allOrbState: "moveTowards" | "moveAway" | "moving" = "moveTowards";
  let prevAllOrbState: "moveTowards" | "moveAway" | "moving" = "moveAway";
  let orbsState = startingOrbs.map((orb) => ({ ...orb, state: "moving" }));
  let chasePatternIndex = 0;

  useBouncingOrbAnimation(
    orbRefs,
    groupRef,
    pivotRef,
    chasePatternIndex,
    allOrbState,
    orbsState,
    startingOrbs,
    prevAllOrbState,
    circleRadius
  );

  return (
    <object3D ref={pivotRef} position={circleCenter}>
      <group ref={groupRef}>
        {startingOrbs.map((orb) => (
          <Orb
            key={orb.key}
            color={new THREE.Color(PS2Blue)}
            position={orb.position}
            scale={[0.3, 0.3, 0.3]}
            castShadow
            receiveShadow
            ref={(el: THREE.Mesh | null) => {
              if (el) {
                orbRefs.current[orb.key] = el;
              }
            }}
          />
        ))}
      </group>
    </object3D>
  );
};

export const Menu: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      <EffectComposer>
        <Bloom
          intensity={10}
          kernelSize={4}
          luminanceThreshold={0.001}
          luminanceSmoothing={1}
        />
      </EffectComposer>
      <ambientLight intensity={0.8} />
      <BouncingOrbs />

      <Html>
        <div className="menu">
          <dialog ref={dialogRef} className="resume-dialog">
            <div className="dialog-header">
              <h3>
                <a
                  href={resume}
                  target="_blank"
                  rel="noreferrer"
                  download="Chris_Kennedy_Resume.pdf"
                >
                  Resume
                  <svg
                    width="800"
                    height="800"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="Interface / Download">
                      <path
                        id="Vector"
                        d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </a>
              </h3>
              <button
                className="close-button"
                onClick={() => dialogRef.current?.close()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="256"
                  height="256"
                  viewBox="0 0 512 512"
                >
                  <line
                    x1="64"
                    y1="64"
                    x2="448"
                    y2="448"
                    strokeWidth="96"
                    strokeLinecap="square"
                  />
                  <line
                    x1="448"
                    y1="64"
                    x2="64"
                    y2="448"
                    strokeWidth="96"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
            <div className="dialog-content">
              {/* Display resume pdf */}
              <object
                data={resume}
                type="application/pdf"
                width="100%"
                height="100%"
              >
                <p>
                  It appears you don't have a PDF plugin for this browser. No
                  worries, you can{" "}
                  <a href={resume} target="_blank" rel="noreferrer">
                    click here to download the PDF file.
                  </a>
                </p>
              </object>
            </div>
          </dialog>
          <div className="menu-items">
            <li
              className="menu-item"
              onClick={() => dialogRef.current?.showModal()}
            >
              Browser
            </li>
            <li
              className="menu-item"
              onClick={() =>
                window.open("https://github.com/cck37/cck37.github.io")
              }
            >
              System Information
            </li>
          </div>
        </div>
      </Html>
    </>
  );
};

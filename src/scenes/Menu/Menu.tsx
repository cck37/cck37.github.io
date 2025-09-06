import React, { useRef } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import resume from "../../assets/resume.pdf";
import { ChasingOrbs } from "../../components/ChasingOrbs";

export const Menu: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      <ambientLight intensity={0.8} />
      <EffectComposer
        multisampling={0}
        resolutionScale={0.7}
        enableNormalPass={false}
      >
        <Bloom
          intensity={5}
          kernelSize={2}
          luminanceThreshold={1}
          luminanceSmoothing={0.5}
          resolutionX={1}
          resolutionY={1}
          mipmapBlur
        />
      </EffectComposer>
      <ChasingOrbs />

      <Html>
        <div className="menu">
          <dialog ref={dialogRef} className="resume-dialog">
            <div className="dialog-header">
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

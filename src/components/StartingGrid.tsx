// TODO: https://r3f.docs.pmnd.rs/advanced/pitfalls
import React, { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Cloud, Clouds, Html, PerspectiveCamera } from "@react-three/drei";
import { useTowerCameraAnimation } from "../hooks/useTowerCameraAnimation";
import { Orb } from "./Orb";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { useRandomOrbMovement } from "../hooks/useRandomOrbMovement";
import { getRandomPositions } from "../utils";

const lighten = (color: string, percent: number) => {
  const colorObj = new THREE.Color(color);
  colorObj.lerp(new THREE.Color("#ffffff"), percent);
  return colorObj.getStyle();
};

const darken = (color: string, percent: number) => {
  const colorObj = new THREE.Color(color);
  colorObj.lerp(new THREE.Color("#000000"), percent);
  return colorObj.getStyle();
};

const mainColorLight = lighten("#616a92", 0.2);

function Box(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 10]} />
      <meshStandardMaterial
        color={darken(mainColorLight, Math.random() * (1 - 0.55) + 0.55)}
      />
    </mesh>
  );
}

const BackgroundPlane: React.FC = () => {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};

const mainGlassBoxColor = lighten("#616a92", 0.4);

function GlassBox(props: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const randomRateMod = Math.random() * (0.75 - 0.3) + 0.3;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += (delta / 3) * randomRateMod;
      meshRef.current.rotation.y += (delta / 3) * randomRateMod;
    }
  });
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        color={mainGlassBoxColor}
        roughness={0}
        transmission={1}
        thickness={2}
      />
    </mesh>
  );
}

const rows = 14;
const xGap = 1.3;
const yGap = 1.3;

const cubesToNotDraw = [
  2, 3, 4, 5, 7, 11, 12, 14, 15, 16, 23, 24, 25, 28, 29, 31, 32, 33, 36, 39, 43,
  49, 50, 53, 56, 67, 69, 74, 76, 79, 81, 82, 83, 88, 90, 91, 92, 93, 94, 97,
  98, 99, 100, 101, 102, 104, 106, 107, 111, 112,
];

const randomCapped = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const spheres = [
  {
    pos: new THREE.Vector3(randomCapped(-5, -1), randomCapped(1, 5), 6),
    color: "green",
  },
  {
    pos: new THREE.Vector3(randomCapped(1, 5), randomCapped(-5, -1), 6),
    color: "red",
  },
  {
    pos: new THREE.Vector3(randomCapped(-5, -1), randomCapped(-5, -1), 6),
    color: "blue",
  },
  {
    pos: new THREE.Vector3(randomCapped(1, 5), 2, randomCapped(1, 6)),
    color: "magenta",
  },
];

const generateRandomOpeningText = () => {
  // TODO: the hell do i put here
  const openingTexts = ["Chris Kennedy Entertainment"];
  return openingTexts[Math.floor(Math.random() * openingTexts.length)];
};

export const StartingGrid: React.FC = () => {
  const orbsRef = useRef<THREE.Mesh[]>([]);

  useTowerCameraAnimation();
  useRandomOrbMovement(orbsRef, getRandomPositions(spheres));

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <spotLight
        position={[0, 0, 102]}
        distance={110}
        decay={0}
        angle={1.5}
        intensity={200}
        castShadow
        color={lighten("#616a92", 0.4)}
      />
      <EffectComposer>
        <SelectiveBloom
          intensity={3}
          kernelSize={4}
          luminanceThreshold={0.001}
          luminanceSmoothing={1}
          selection={orbsRef.current}
        />
      </EffectComposer>
      <BackgroundPlane />
      <Clouds>
        <Cloud
          seed={0.42}
          concentrate={"inside"}
          opacity={0.18}
          segments={3}
          bounds={[-2, 3, 5]}
          volume={12}
          color="#132c56"
        />
      </Clouds>
      <GlassBox key="top-left-transparent" position={[-4, 2, 10]} />
      <GlassBox key="top-right-transparent" position={[3, 2, 10]} />
      <GlassBox key="bottom-left-transparent" position={[-4, -2, 10]} />
      <GlassBox key="bottom-right-transparent" position={[3, -1, 6]} />
      <GlassBox key="middle-transparent" position={[-2, 1, 7]} />
      {spheres.map((sphere, index) => (
        <Orb
          key={index}
          color={new THREE.Color(sphere.color)}
          position={sphere.pos}
          scale={[0.1, 0.1, 0.1]}
          castShadow
          receiveShadow
          flat
          ref={(el: THREE.Mesh | null) => {
            if (el) {
              orbsRef.current[index] = el;
            }
          }}
        />
      ))}
      {/* TODO: Make instanced see https://codesandbox.io/p/sandbox/r3f-instanced-colors-8fo01?file=%2Fsrc%2FApp.js%3A61%2C8-61%2C25*/}
      {Array.from({ length: 112 }, (_, i) =>
        // Skip certain cubes based on the cubesToNotDraw array
        cubesToNotDraw.includes(i + 1) ? null : (
          <Box
            key={i}
            position={[
              (i % rows) * xGap - (rows / 2) * xGap,
              Math.floor(i / rows) * yGap - (112 / rows / 2) * yGap,
              Math.random() * (1 - 0) * -1,
            ]}
          />
        )
      )}
      <Html>
        {/* TODO: Callback */}
        <div id="openingText">{generateRandomOpeningText()}</div>
      </Html>
    </>
  );
};

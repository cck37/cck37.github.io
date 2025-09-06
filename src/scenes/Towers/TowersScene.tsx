// TODO: https://r3f.docs.pmnd.rs/advanced/pitfalls
import React, { useRef } from "react";
import * as THREE from "three";
import {
  Cloud,
  Clouds,
  Html,
  Instance,
  Instances,
  PerspectiveCamera,
} from "@react-three/drei";
import { useTowerCameraAnimation } from "./hooks/useTowerCameraAnimation";
import { Orb } from "../../components/Orb";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useRandomOrbMovement } from "./hooks/useRandomOrbMovement";
import { getRandomPositions } from "../../utils";
import { Tower } from "../../components/Tower";
import { BackgroundPlane } from "../../components/BackgroundPlane";
import { GlassBox } from "../../components/GlassBox";
import { CLOUD_COLOR, SPHERES, SPOT_LIGHT_COLOR, TOWERS } from "./constants";

export const TowersScene: React.FC = () => {
  const orbsRef = useRef<THREE.Mesh[]>([]);

  useTowerCameraAnimation();
  useRandomOrbMovement(orbsRef, getRandomPositions(SPHERES));

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
        color={SPOT_LIGHT_COLOR}
      />
      <ambientLight />
      <EffectComposer
        multisampling={0}
        resolutionScale={0.7}
        enableNormalPass={false}
      >
        <Bloom
          intensity={1}
          kernelSize={1}
          luminanceThreshold={1}
          luminanceSmoothing={0.5}
          resolutionX={1}
          resolutionY={1}
          minMapBlur
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
          speed={0}
          color={CLOUD_COLOR}
        />
      </Clouds>
      <GlassBox key="top-left-transparent" position={[-4, 2, 10]} />
      <GlassBox key="top-right-transparent" position={[3, 2, 10]} />
      <GlassBox key="bottom-left-transparent" position={[-4, -2, 10]} />
      <GlassBox key="bottom-right-transparent" position={[3, -1, 6]} />
      <GlassBox key="middle-transparent" position={[-2, 1, 7]} />
      {SPHERES.map((sphere, index) => (
        <Orb
          key={index}
          color={new THREE.Color(sphere.color)}
          position={sphere.pos}
          scale={[0.1, 0.1, 0.1]}
          emissiveIntensity={20}
          flat
          ref={(el: THREE.Mesh | null) => {
            if (el) {
              orbsRef.current[index] = el;
            }
          }}
        />
      ))}
      <Instances limit={112}>
        <Tower />
        {TOWERS.map((tower, index) => (
          <Instance key={index} position={tower.pos} color={tower.color} />
        ))}
      </Instances>
      <Html>
        <div id="openingText">Chris Kennedy Entertainment</div>
      </Html>
    </>
  );
};

import {
  GradientTexture,
  Html,
  KeyboardControls,
  OrbitControls,
  PerspectiveCamera,
  useKeyboardControls,
  type KeyboardControlsEntry,
} from "@react-three/drei";
import type {
  BrowseModel,
  BrowserModalInput,
  MemoryGridProps,
} from "../../types";
import { Randle } from "../../assets/Randle";
import { Resume } from "../../assets/Resume";
import { PS2 } from "../../assets/PS2";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import { Orb } from "../../components/Orb";
import { PS2BackgroundBlue } from "../../utils/colorUtils";

const MODELS: BrowseModel[] = [
  {
    id: "resume",
    modalData: {
      title: "Resume",
      description: "It's my resume which was also written with typst",
      urls: [
        "/assets/resume.pdf",
        "https://github.com/cck37/cck37.github.io/blob/main/src/resume/resume.typ",
      ],
      modalRotation: [-0.56, 0, 0] as const,
    },
    component: Resume,
    scale: 0.08,
    position: [0, 0, 0] as const,
  },
  {
    id: "randle",

    component: Randle,
    scale: 0.00235,
    position: [0.1, -0.2, 0] as const,
    modalData: {
      title: "Randle",
      description:
        "A daily category guessing game with different topics each day. Made with next.js",
      urls: ["https://randle.day/", "https://github.com/cck37/randle"],
      modalRotation: [-0.5, 0, 0] as const,
      modalPostion: [0, -1.2, 0] as const,
    },
  },
  {
    id: "ps2",
    component: PS2,
    scale: 1,
    position: [0, 0, 0] as const,
    modalData: {
      title: "This site",
      description: "PS2 emulated site written with React Three Fiber",
      urls: [
        "https://cck37.github.io",
        "https://github.com/cck37/cck37.github.io",
      ],
      modalRotation: [-0.56, 0, 0] as const,
    },
  },
];

function pulse(time: number, min: number, max: number, period: number) {
  const t = (time % period) / period;

  if (t < 0.5) {
    return THREE.MathUtils.lerp(min, max, t * 2);
  }

  return THREE.MathUtils.lerp(max, min, (t - 0.5) * 2);
}

type AnimatedBrowseModelType = {
  model: BrowseModel;
  onAnimationFinished: () => void;
};

const AnimatedBrowseModel = ({
  model,
  onAnimationFinished,
}: AnimatedBrowseModelType) => {
  const rotation = [0.5, 0, 0];
  const groupRef = useRef<THREE.Group | null>(null);
  const scale = useRef<number>(0);
  const notified = useRef<boolean>(false);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    scale.current = Math.min(1, scale.current + delta * 2.5); // TODO: no magic numbers
    groupRef.current.scale.setScalar(scale.current);

    if (scale.current === 1 && !notified.current) {
      notified.current = true;
      onAnimationFinished();
    }
  });

  return (
    <group ref={groupRef} scale={0}>
      <model.component
        scale={model.scale}
        position={model.position}
        rotation={rotation}
      />
    </group>
  );
};

const MemoryGrid = ({
  models,
  onAnimationFinished,
  showLoading,
  setModal,
  modal,
}: MemoryGridProps) => {
  const columns = 5;
  const spacing = 3;
  const firstModelId = models[0].id;
  const [hoveredId, setHoveredId] = useState<string | null>(firstModelId);

  const orbRef = useRef<THREE.Mesh | null>(null);
  const orbMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  const [, getKeyState] = useKeyboardControls<Controls>();
  const lastInput = useRef(0);

  useFrame(({ clock }) => {
    if (modal) return; // if the modal is showing, don't do any animations

    /* Animations */
    if (orbRef.current)
      orbRef.current.scale.setScalar(pulse(clock.elapsedTime, 0.14, 0.17, 3));

    if (orbMatRef.current)
      orbMatRef.current.emissiveIntensity = pulse(clock.elapsedTime, 50, 70, 3);

    /* Inputs */
    if (showLoading) return; // no input while loading
    const { left, right, up, down, enter } = getKeyState();
    if (!(left || right || up || down || enter)) return;
    if (clock.elapsedTime - lastInput.current < 0.122) return;
    const curModel = models.find((model) => model.id === hoveredId);
    if (enter && curModel)
      setModal({
        model: curModel,
      });

    const curHoverModelIndex =
      hoveredId !== null
        ? models.findIndex((model) => model.id === hoveredId)
        : 0;
    let newHoverIndex = curHoverModelIndex;
    if (left) newHoverIndex -= 1;
    if (right) newHoverIndex += 1;
    if (up) newHoverIndex -= 5;
    if (down) newHoverIndex += 5;

    const selectedModel =
      models[Math.max(0, Math.min(models.length - 1, newHoverIndex))];
    setHoveredId(selectedModel.id);

    lastInput.current = clock.elapsedTime;
  });

  return (
    <group>
      {models.map((model, i) => {
        const col = (i % columns) - 2;
        const row = Math.floor(i / columns) * -1 + 3;

        return (
          <group
            key={model.id}
            position={[col * spacing, row * spacing, 0]}
            onPointerEnter={() => setHoveredId(model.id)}
            onPointerLeave={() => setHoveredId(null)}
          >
            <AnimatedBrowseModel
              model={model}
              key={model.id}
              onAnimationFinished={onAnimationFinished}
            />
            {hoveredId === model.id && (
              <>
                <Orb
                  ref={orbRef}
                  materialRef={orbMatRef}
                  scale={0.6}
                  position={[model.position[0], -0.9, model.position[2] - 0.9]}
                  color={new THREE.Color("white")}
                  emissiveIntensity={50}
                  showTrail={false}
                />

                <pointLight
                  position={[
                    model.position[0],
                    model.position[1] - 1.1,
                    model.position[2] + 0.4,
                  ]}
                  intensity={2}
                  distance={4}
                  decay={2}
                  color="white"
                />
              </>
            )}
          </group>
        );
      })}
    </group>
  );
};

enum Controls {
  left = "left",
  right = "right",
  up = "up",
  down = "down",
  enter = "enter",
}

type BrowserModalType = {
  modal: BrowserModalInput;
  setModal: (modal: null) => void;
};

export const BrowserModal = ({ modal, setModal }: BrowserModalType) => {
  const { model } = modal;
  const { title, description, urls } = model.modalData;
  const { viewport } = useThree();
  const meshRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  useFrame((_, delta) => {
    if (meshRef.current)
      meshRef.current.opacity = Math.min(
        0.9,
        meshRef.current.opacity + delta * 2,
      );
    if (groupRef.current) groupRef.current.rotation.y += 0.0075;
  });
  return (
    <>
      <mesh position={[0, 0, 10]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial
          ref={meshRef}
          color={PS2BackgroundBlue}
          transparent
          opacity={0}
        ></meshBasicMaterial>
      </mesh>
      <group
        ref={groupRef}
        position={[
          -viewport.width * 0.1,
          model.modalData.modalPostion ? model.modalData.modalPostion[1] : 0,
          12,
        ]}
      >
        <model.component
          scale={model.scale * 1.5}
          rotation={model.modalData.modalRotation}
        />
      </group>
      <Html position={[0, viewport.height * 0.3, 0]}>
        <div className="browse-modal-wrapper">
          <h2 className="browse-model-description">
            Memory Card <span style={{ fontSize: "2.5rem" }}>(PS2)</span>/ 2
          </h2>
          <h1 className="browse-modal-title">{title}</h1>
          <h2 className="browse-model-description">{description}</h2>
          <li className="menu-item" onClick={() => window.open(urls[0])}>
            Link
          </li>
          <li className="menu-item" onClick={() => window.open(urls[1])}>
            Source
          </li>
        </div>

          <button className="browse-model-close" onClick={() => setModal(null)}>
            X
          </button>
      </Html>
    </>
  );
};

export const BrowseScreen: React.FC = () => {
  const [mountedModels, setMountedModels] = useState(1);
  const controlMap = useMemo<KeyboardControlsEntry<Controls>[]>(
    () => [
      { name: Controls.left, keys: ["ArrowLeft"] },
      { name: Controls.right, keys: ["ArrowRight"] },
      { name: Controls.up, keys: ["ArrowUp"] },
      { name: Controls.down, keys: ["ArrowDown"] },
      { name: Controls.enter, keys: ["Enter"] },
    ],
    [],
  );
  const [modal, setModal] = useState<BrowserModalInput | null>(null);

  const handleAnimationFinished = () => {
    console.log(
      `someone called animation finished: mounted:${mountedModels} loading:${mountedModels > MODELS.length}`,
    );
    setMountedModels((v) => Math.min(v + 1, MODELS.length));
  };
  console.log(
    `Loading models 0 to ${mountedModels} ${MODELS.slice(0, mountedModels)}`,
  );

  return (
    <KeyboardControls map={controlMap}>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      {!modal && (
        <EffectComposer>
          <Bloom
            mipmapBlur={false}
            intensity={1}
            luminanceThreshold={1}
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.HUGE}
          />
        </EffectComposer>
      )}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 0.5, 0.6]}
            colors={["white", "grey", "black"]}
            rotation={Math.PI / 4}
            center={[0.5, 0.5]}
            size={500}
          />
        </meshBasicMaterial>
      </mesh>
      <ambientLight intensity={2} />
      <MemoryGrid
        models={MODELS.slice(0, mountedModels)}
        onAnimationFinished={handleAnimationFinished}
        showLoading={mountedModels < MODELS.length}
        modal={modal}
        setModal={setModal}
      />
      {modal && <BrowserModal modal={modal} setModal={setModal} />}
      {!modal && (
        <Html fullscreen>
          <div className="browse-title-wrapper">
            <div className="browse-memory-card-read">
              <h1>Memory Card (PS2) / 1</h1>
              <h1>5,330 KB Free</h1>
            </div>
            <div className="browse-selection">
              <h1>Test</h1>{" "}
            </div>
          </div>
          <div className="browse-loading-wrapper">
            {mountedModels < MODELS.length && <h1>Loading...</h1>}
          </div>
        </Html>
      )}

      {/* <OrbitControls /> */}
    </KeyboardControls>
  );
};

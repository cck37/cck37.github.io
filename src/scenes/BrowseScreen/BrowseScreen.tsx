import {
  GradientTexture,
  Helper,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";

export const BrowseScreen: React.FC = () => {
  console.log("BrowseScreen rendered");
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
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
      <Html fullscreen>
        <div className="browse-title-wrapper">
          <div className="browse-memory-card-read">
            <h1>Memory Card (PS2) / 1</h1>
            <h1>5,330 KB Free</h1>
          </div>
          <div className="browse-selection">
            {/* TODO: */}
            <h1>Test</h1>
          </div>
        </div>
      </Html>
    </>
  );
};

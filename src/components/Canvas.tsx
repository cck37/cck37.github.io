import { Canvas } from "@react-three/fiber";
import { canvasProps } from "../utils/canvasProps";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

const Adaptive = () => (
  <>
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </>
);

interface FadeCanvasProps {
  children: React.ReactNode;
  isFadingOut: boolean;
}

export const FadeCanvas: React.FC<FadeCanvasProps> = ({
  children,
  isFadingOut,
}) => (
  <div className={isFadingOut ? "fade-out" : "fade-in"}>
    <Canvas {...canvasProps}>
      <Adaptive />
      {children}
    </Canvas>
  </div>
);

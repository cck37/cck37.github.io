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
  onFadeOutEnd?: () => void;
}

export const FadeCanvas: React.FC<FadeCanvasProps> = ({
  children,
  isFadingOut,
  onFadeOutEnd,
}) => (
  <div
    className={isFadingOut ? "fade-out" : "fade-in"}
    onTransitionEnd={(e) => {
      if (
        isFadingOut &&
        e.target == e.currentTarget &&
        e.propertyName === "opacity"
      ) {
        onFadeOutEnd?.();
      }
    }}
  >
    <Canvas {...canvasProps} className="canvas">
      <Adaptive />
      {children}
    </Canvas>
  </div>
);

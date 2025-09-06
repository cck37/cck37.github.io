export const BackgroundPlane: React.FC = () => {
  return (
    <mesh position={[0, 0, -10]}>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color={"black"} />
    </mesh>
  );
};

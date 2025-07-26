import React, { useRef, useEffect } from "react";

import Cube from "../classes/Cube";

// GPT said this was a good idea
const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

function drawScene(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cubes: Cube[]
) {
  const perspective = 700;
  const centerX = width / 2;
  const centerY = height / 2;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  const sortedCubes = [...cubes].sort((a, b) => b.z - a.z);
  console.log(sortedCubes.map((c) => c.z));
  // const averageDepth = (cube: Cube) => cube.x + cube.y + cube.z;
  // const sortedCubes = [...cubes].sort(
  //   (a, b) => averageDepth(b) - averageDepth(a)
  // );

  // .box-container:nth-child(41) .box,
  // .box-container:nth-child(40) .box,
  // .box-container:nth-child(47) .box,
  // .box-container:nth-child(48) .box,
  // .box-container:nth-child(46) .box,
  // .box-container:nth-child(95) .box,
  // .box-container:nth-child(94) .box,
  // .box-container:nth-child(102) .box,
  // .box-container:nth-child(101) .box {
  //   visibility: hidden;
  // }

  const cubesToSkip = [41, 40, 47, 48, 46, 95, 94, 102, 101];

  for (const cube of sortedCubes) {
    if (cubesToSkip.includes(cube.id)) {
      continue;
    }
    cube.draw(ctx, centerX, centerY, perspective);
  }
}

export const CubeGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cubesRef = useRef<Cube[]>([]);

  const generateCubes = (width: number, height: number) => {
    if (cubesRef.current.length === 0) {
      const cols = 14;
      const rows = Math.ceil(112 / cols);
      const cubeSize = width / 20;
      const spacing = cubeSize * 1.2;

      const newCubes: Cube[] = [];

      for (let i = 0; i < 112; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = (col - cols / 2) * spacing;
        const y = (row - rows / 2) * spacing;
        const z = Math.random() * 200 - 50;

        const lightness = Math.floor(Math.random() * 50 + 10); // 20% to 50%
        const color = `hsl(229, 20%, ${lightness}%)`;

        newCubes.push(new Cube(i, x, y, z, cubeSize, color));
      }

      cubesRef.current = newCubes;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const handleResize = () => {
      const parent = canvas.parentElement;
      const scaleX = (parent?.clientWidth || CANVAS_WIDTH) / CANVAS_WIDTH;
      const scaleY = (parent?.clientHeight || CANVAS_HEIGHT) / CANVAS_HEIGHT;
      console.log(
        `scaleX: ${scaleX}, scaleY: ${scaleY}, parent: ${parent?.clientWidth}, ${parent?.clientHeight}`
      );
      const scale = Math.min(scaleX, scaleY);

      canvas.style.width = `${CANVAS_WIDTH * scale}px`;
      canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
    };

    generateCubes(canvas.width, canvas.height);

    handleResize();
    drawScene(ctx, canvas.width, canvas.height, cubesRef.current);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

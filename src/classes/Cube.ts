import { isFaceVisible, project3D } from "../utils";

class Cube {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  hs: number;
  depth: number;
  zhs: number;
  corners: { x: number; y: number; z: number }[] = [];

  constructor(
    id: number,
    x: number,
    y: number,
    z: number,
    size: number,
    color: string
  ) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.color = color;
    this.hs = size / 2;
    this.depth = size * 3;
    this.zhs = this.depth / 2;
    this.corners = [
      { x: this.x - this.hs, y: this.y - this.hs, z: this.z - this.zhs }, // 0: top-left-front
      { x: this.x + this.hs, y: this.y - this.hs, z: this.z - this.zhs }, // 1: top-right-front
      { x: this.x + this.hs, y: this.y + this.hs, z: this.z - this.zhs }, // 2: bottom-right-front
      { x: this.x - this.hs, y: this.y + this.hs, z: this.z - this.zhs }, // 3: bottom-left-front
      { x: this.x - this.hs, y: this.y - this.hs, z: this.z + this.zhs }, // 4: top-left-back
      { x: this.x + this.hs, y: this.y - this.hs, z: this.z + this.zhs }, // 5: top-right-back
      { x: this.x + this.hs, y: this.y + this.hs, z: this.z + this.zhs }, // 6: bottom-right-back
      { x: this.x - this.hs, y: this.y + this.hs, z: this.z + this.zhs }, // 7: bottom-left-back
    ];
  }

  draw(
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    perspective: number
  ) {
    // const { x, y, scale } = project3D(this.x, this.y, this.z, perspective);
    // const screenX = centerX + x;
    // const screenY = centerY + y;
    // const screenSize = this.size * scale;

    // ctx.fillStyle = this.color;
    // ctx.fillRect(
    //   screenX - screenSize / 2,
    //   screenY - screenSize / 2,
    //   screenSize,
    //   screenSize
    // );

    // draw front face of cube
    ctx.fillStyle = this.color;
    ctx.fillRect(centerX - this.hs, centerY - this.hs, this.size, this.size);

    // Project corners to 2D screen space
    const projected = this.corners.map(({ x, y, z }) => {
      const p = project3D(x, y, z, perspective);
      return {
        x: centerX + p.x,
        y: centerY + p.y,
      };
    });

    // Create gradients for each visible face
    const createGradient = (i1: number, i2: number) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      grad.addColorStop(0, "rgb(191, 195, 212)");
      grad.addColorStop(0.5, "rgba(191, 195, 212, 0.5)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.2)");
      return grad;
    };
    // drawFace([1, 2, 6, 5], createGradient(1, 2)); // right
    // drawFace([0, 3, 7, 4], createGradient(0, 3)); // left
    // drawFace([0, 1, 5, 4], createGradient(0, 1)); // top
    // drawFace([0, 1, 2, 3], this.color); // front
  }

  // drawFace = (indices: number[], fillStyle: string | CanvasGradient) => {
  //   ctx.beginPath();
  //   ctx.moveTo(projected[indices[0]].x, projected[indices[0]].y);
  //   for (let i = 1; i < indices.length; i++) {
  //     ctx.lineTo(projected[indices[i]].x, projected[indices[i]].y);
  //   }
  //   ctx.closePath();
  //   ctx.fillStyle = fillStyle;
  //   ctx.fill();
  // };
}

export default Cube;

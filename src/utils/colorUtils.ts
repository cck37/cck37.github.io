import * as THREE from "three";

export const mainGray = "#616a92";

export const PS2Blue = "#006FCD";

export const lighten = (color: string, percent: number) => {
  const colorObj = new THREE.Color(color);
  colorObj.lerp(new THREE.Color("#ffffff"), percent);
  return colorObj.getStyle();
};

export const darken = (color: string, percent: number) => {
  const colorObj = new THREE.Color(color);
  colorObj.lerp(new THREE.Color("#000000"), percent);
  return colorObj.getStyle();
};

// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

export default (
  cols /*: number */,
  rows /*: number */,
  scaleX /*: number */,
  scaleY /*: number */,
  scaleZ /*: number */,
  scene /*: Object */,
  reticleStuff /*: Object */,
) /*: {pixelGridGroup:Object, pixelGridCubes:Array<Cube>} */ => {
  //create a group and add the two cubes
  //These cubes can now be rotated / scaled etc as a group
  const pixelGridGroup = new THREE.Group();

  const pixelGridCubes /*: Array<Cube> */ = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cellColour = 255 - Math.ceil(255 * Math.random());
      const geometry = new THREE.BoxGeometry(
        1 * scaleX,
        1 * scaleY,
        1 * scaleZ,
      );

      const material = new THREE.MeshBasicMaterial({
        color: `rgb(${cellColour},${cellColour},${cellColour})`,
      });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.z = j * scaleZ;
      cube.position.y = i * scaleY;
      cube.bubble_value = cellColour;
      cube.castShadow = true;
      pixelGridGroup.add(cube);
      pixelGridCubes.push(cube);
    }
  }
  scene.add(pixelGridGroup);
  return { pixelGridGroup, pixelGridCubes };
};

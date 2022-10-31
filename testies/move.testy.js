// @flow
import { test, testPromise, should } from "../server/testy.js";
import move from "../js/three-bubble-sort/actions/move.js";
import cubesOrdered from "./fixtures/move_cubes_ordered.js";
import anime from "./stubs/anime.js";
import cubes1 from "./fixtures/move_cubes1.js";
import cubes2 from "./fixtures/move_cubes2.js";
import cubes3 from "./fixtures/move_cubes3.js";

const skip = false;

test(
  "Move | Returns the cubes array unaffected if it is already in order",
  () /*: void */ => {
    const speed = 0.1;
    const scaleZ = 1;
    let testCubes = cubes1;
    for (let i = 0; i < 12; i++) {
      testCubes = move(testCubes, speed, scaleZ, anime);
    }
    should(JSON.stringify(testCubes)).be.exactly(JSON.stringify(cubesOrdered));
  },
  skip,
);

test(
  "Move | Returns the cubes array in order  if the first two items passed in are out of order",
  () /*: void */ => {
    const speed = 0.1;
    const scaleZ = 1;
    let testCubes = cubes2;
    for (let i = 0; i < 12; i++) {
      testCubes = move(testCubes, speed, scaleZ, anime);
    }
    should(JSON.stringify(testCubes)).be.exactly(JSON.stringify(cubesOrdered));
  },
  skip,
);

test("Move | Returns the cubes array in order  if the items passed in are in reverse order", () /*: void */ => {
  const speed = 0.1;
  const scaleZ = 1;
  let testCubes = cubes3;
  for (let i = 0; i < 12; i++) {
    testCubes = move(testCubes, speed, scaleZ, anime);
  }
  should(JSON.stringify(testCubes)).be.exactly(JSON.stringify(cubesOrdered));
});

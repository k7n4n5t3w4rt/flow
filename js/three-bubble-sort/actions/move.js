// @flow

const move = (
  cubes /*: Cubes */,
  speed /*: number */,
  scaleZ /*: number */,
  anime /*: function */,
) /*: Cubes */ => {
  // NOTE:
  // This might not be very clear so:
  //
  // cubes is an an array of columns of cubes.
  // Each cube object is a REFERENCE to a THREE.js Mesh object that
  // was atached to the THREE.js scene in:
  //
  //		/js/three-bubble-sort/actions/pixelGrid.js (Line 34)
  //
  let movingCube1 /*: boolean */ = true;
  let movingCube2 /*: boolean */ = true;
  const currentIndex /*: number */ = cubes.currentIndex;
  const nextIndex = cubes.currentIndex + 1;
  const cube1 = cubes.pixelGrid[currentIndex];
  const cube2 = cubes.pixelGrid[nextIndex];

  if (cubes.moving === false) {
    // Check if we are actually at the end of the array of cubes
    // and set cubes to not be active so as to stop
    // the animation in render()
    if (cube2 === undefined) {
      cubes.active === false;
      cubes.currentIndex = 0;
      return cubes;
    }
    // console.log(`Trying cubes[${currentIndex}] and cubes[${nextIndex}]...`);

    // console.log(
    //   `Comparing cubes[${currentIndex}] bubble value (${cube1.bubble_value}) with  cubes[${nextIndex}] bubble value (${cube2.bubble_value})`,
    // );

    if (cube1.bubble_value > cube2.bubble_value) {
      //   console.log(
      //     `cubes[${currentIndex}] bubble value (${cube1.bubble_value}) > cubes[${nextIndex}] bubble value (${cube2.bubble_value})`,
      //   );

      //   console.log(`cubes.moving === `, cubes.moving);
      if (cubes.moving === false) {
        // console.log(
        //   `Preparing to swap cubes[${currentIndex}]and cubes[${nextIndex}]...`,
        // );

        const cube1StartPos = {
          z: cube1.position.z,
          y: cube1.position.y,
        };
        // This will cause all calls to move() to have no effect... until
        // the move has finished and cubes.moving is set back to false
        cubes.moving = true;

        // Move cube1
        anime({
          targets: [cube1.position],
          x: [
            {
              value: cube1.position.x - 2 * scaleZ,
              duration: (1000 * speed) / 2,
              delay: 0,
            },
            {
              value: cube1.position.x,
              duration: 1000 * speed,
              delay: 0,
            },
          ],
          z: [
            {
              value: cube2.position.z,
              duration: 1000 * speed,
              delay: 0,
            },
          ],
          y: [
            {
              value: cube2.position.y,
              duration: 1000 * speed,
              delay: 0,
            },
          ],
          delay: 500,
          easing: "easeInOutCirc",
          complete: function (anim) {
            //   completeLogEl.value = 'completed : ' + anim.completed;
            // Move cube1
            movingCube1 = false;
            if (movingCube2 === false) {
              cubes.moving = false;
              cubes.currentIndex = nextIndex;
              cubes.pixelGrid[currentIndex] = cube2;
              cubes.pixelGrid[nextIndex] = cube1;
              return cubes;
            }
          },
        });
        anime({
          targets: [cube2.position],
          x: [
            {
              value: cube2.position.x + 2 * scaleZ,
              duration: (1000 * speed) / 2,
              delay: 0,
            },
            {
              value: cube2.position.x,
              duration: 1000 * speed,
              delay: 0,
            },
          ],
          z: [{ value: cube1StartPos.z, duration: 1000 * speed, delay: 0 }],
          y: [{ value: cube1StartPos.y, duration: 1000 * speed, delay: 0 }],
          delay: 500,
          easing: "easeInOutCirc",
          complete: function (anim) {
            //   completeLogEl.value = 'completed : ' + anim.completed;
            movingCube2 = false;
            if (movingCube1 === false) {
              cubes.moving = false;
              cubes.currentIndex = nextIndex;
              cubes.pixelGrid[currentIndex] = cube2;
              cubes.pixelGrid[nextIndex] = cube1;
              return cubes;
            }
          },
        });
      }
    } else {
      cubes.currentIndex = nextIndex;
    }
  }
  return cubes;
};

export default move;

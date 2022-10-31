// @flow

const cubes /*: Cubes */ = {
  pixelGridGroup: {},
  pixelGrid: [
    {
      position: {
        z: 0,
        x: 0,
        y: 0,
      },
      bubble_value: 0,
    },
    {
      position: {
        z: 1,
        x: 0,
        y: 0,
      },
      bubble_value: 1,
    },
    {
      position: {
        z: 0,
        x: 0,
        y: 1,
      },
      bubble_value: 2,
    },
    {
      position: {
        z: 1,
        x: 0,
        y: 1,
      },
      bubble_value: 3,
    },
  ],
  moving: false,
  active: false,
  currentIndex: 0,
};

export default cubes;

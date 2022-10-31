type config = {
  CONTAINER_ID: string,
  SHOW_WORKING: boolean,
  FPS: number,
  ACCELLERATION: number,
  CLICK?: number,
  COLS: number,
  ROWS: number,
  MAX_SECONDS_TRANSITION_INTERVAL: number,
  CONSTANT_TRANSITION_SPEED: boolean,
  LOOP: boolean,
  RELOAD_INTERVAL: number,
  FINISH_COUNTER: Object,
};

type Position = {
  x: number,
  y: number,
  z: number,
};

type Cube = {
  position: Position,
  bubble_value: number,
};

type Cubes = {
  pixelGridGroup: Object,
  pixelGrid: Array<Cube>,
  moving: boolean,
  active: boolean,
  currentIndex: number,
};

type ReticleStuff = {
  reticle: Object,
  hitTestSource?: Object,
  localSpace?: Object,
  viewerSpace?: Object,
  hitTestSourceInitialized?: Object,
  active: boolean,
};

type SceneData = {
  stats: Object,
  scene: Object,
  camera: Object,
  renderer: Object,
  reticleStuff: ReticleStuff,
  cubes: Cubes,
};

declare module "finalhandler" {
  declare module.exports: any;
}

declare module "../web_modules/immer.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-render-to-string.js" {
  declare module.exports: any;
}

declare module "serve-static" {
  declare module.exports: any;
}

declare module "glob" {
  declare module.exports: any;
}

declare module "../web_modules/should/as-function.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../../web_modules/preact/hooks.js" {
  declare module.exports: any;
}

declare module "../web_modules/simplestyle-js.js" {
  declare module.exports: any;
}

declare module "../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../../web_modules/htm/preact.js" {
  declare module.exports: any;
}

declare module "../web_modules/preact-router.js" {
  declare module.exports: any;
}

declare module "../web_modules/history.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/libs/stats.module.js" {
  declare module.exports: any;
}

declare module "../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}

declare module "../../../web_modules/three/examples/jsm/controls/OrbitControls.js" {
  declare module.exports: any;
}
declare module "../../web_modules/three/examples/jsm/loaders/TGALoader.js" {
  declare module.exports: any;
}
declare module "../../../web_modules/animejs.js" {
  declare module.exports: any;
}

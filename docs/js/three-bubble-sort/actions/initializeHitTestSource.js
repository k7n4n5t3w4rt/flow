// @flow
// --------------------------------------------------
// HELPERS
// --------------------------------------------------

// This function gets called just once to initialize a hitTestSource
// The purpose of this function is to get a) a hit test source and b) a reference space

export default async (sceneData /*: SceneData */) /*: Promise<SceneData> */ => {
  const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;
  const session = renderer.xr.getSession();

  // Reference spaces express relationships between an origin and the world.

  // For hit testing, we use the "viewer" reference space,
  // which is based on the device's pose at the time of the hit test.
  const viewerSpace = await session.requestReferenceSpace("viewer");
  reticleStuff.hitTestSource = await session.requestHitTestSource({
    space: viewerSpace,
  });

  // We're going to use the reference space of "local" for drawing things.
  // which gives us stability in terms of the environment.
  // read more here: https://developer.mozilla.org/en-US/docs/Web/API/XRReferenceSpace
  reticleStuff.localSpace = await session.requestReferenceSpace("local");

  // set this to true so we don't request another hit source for the rest of the session
  reticleStuff.hitTestSourceInitialized = true;

  // In case we close the AR session by hitting the button "End AR"
  session.addEventListener("end", () => {
    reticleStuff.hitTestSourceInitialized = false;
    reticleStuff.hitTestSource = null;
  });
  return { stats, scene, camera, renderer, reticleStuff, cubes };
};

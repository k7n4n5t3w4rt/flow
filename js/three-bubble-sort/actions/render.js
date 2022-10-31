// @flow
// --------------------------------------------------
// THREE.js
// --------------------------------------------------
import * as THREE from "../../../web_modules/three.js";
// --------------------------------------------------
// HELPERS
// --------------------------------------------------
import move from "./move.js";
import initializeHitTestSource from "./initializeHitTestSource.js";
import anime from "../../../web_modules/animejs.js";

export default (
  sceneData /*: SceneData */,
  speed /*: number */,
  scaleX /*: number */,
  scaleY /*: number */,
  scaleZ /*: number */,
  cols /*: number */,
  rows /*: number */,
) /*: () => Promise<any>  */ => {
  return async (timestamp, frame) /*: Promise<any> */ => {
    if (frame) {
      // 1. create a hit test source once and keep it for all the frames
      // this gets called only once
      // Could I move this to animate()?
      if (!sceneData.reticleStuff.hitTestSourceInitialized) {
        sceneData = await initializeHitTestSource(sceneData);
      }

      const { stats, scene, camera, renderer, reticleStuff, cubes } = sceneData;

      if (reticleStuff.active) {
        // 2. get hit test results
        if (reticleStuff.hitTestSourceInitialized) {
          // we get the hit test results for a particular frame
          const hitTestResults = frame.getHitTestResults(
            reticleStuff.hitTestSource,
          );

          // XRHitTestResults The hit test may find multiple surfaces. The first one in the array is the one closest to the camera.
          if (hitTestResults.length > 0) {
            const hit = hitTestResults[0];
            // Get a pose from the hit test result. The pose represents the pose of a point on a surface.
            const pose = hit.getPose(reticleStuff.localSpace);

            reticleStuff.reticle.visible = true;
            // Transform/move the reticle image to the hit test position
            reticleStuff.reticle.matrix.fromArray(pose.transform.matrix);
          } else {
            reticleStuff.reticle.visible = false;
          }
        }
      } else {
        reticleStuff.reticle.visible = false;
        // -------------------------------------
        // Weirdly, this kills the rendering
        // -------------------------------------
        // reticleStuff.hitTestSourceInitialized = false;
        // reticleStuff.hitTestSource = null;
      }

      if (cubes.pixelGrid !== undefined && cubes.active === true) {
        move(cubes, speed, scaleZ, anime);
      }
      sceneData.stats.update();
      renderer.render(scene, camera);
    }
  };
};

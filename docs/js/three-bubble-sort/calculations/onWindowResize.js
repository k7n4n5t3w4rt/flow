// @flow
export default (
  camera /*: { aspect: number, updateProjectionMatrix: () => {} } */,
  renderer /*: { setSize: (number, number) => {} } */,
  window /*: { innerWidth: number, innerHeight: number } */,
) /*: ()=>void */ => {
  return () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
};

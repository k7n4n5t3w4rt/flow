// @flow
export default () => {
  // First thing we do is setup the mobile debug console
  // This library is very big so only use it while debugging
  // just comment it out when your app is done
  const containerEl = document.getElementById("console-ui");
  if (containerEl !== undefined) {
    // $FlowFixMe
    eruda.init({
      container: containerEl,
    });
    // $FlowFixMe
    const devToolEl = containerEl.shadowRoot.querySelector(".eruda-dev-tools");
    if (devToolEl !== undefined) {
      // $FlowFixMe
      devToolEl.style.height = "40%"; // control the height of the dev tool panel
    }
  }
};

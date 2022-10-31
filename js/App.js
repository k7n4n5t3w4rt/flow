// @flow
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
import { AppProvider } from "./AppContext.js";
import BubbleSort from "./BubbleSort.js";
import ThreeBubbleSort from "./three-bubble-sort/ThreeBubbleSort.js";
// import registerServiceWorker from "./registerServiceWorker.js";
const finishCounter = {
  ALGORITHMS: [],
  COUNT: 0,
};

/*::
type Props = {
  url: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
      	<${ThreeBubbleSort} path="/" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;

// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

const seed /*: number */ = parseInt(
  "counter".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    color: "gold",
  },
  counter: {
    fontSize: "7em",
    color: "silver",
  },
  buttons: {
    fontSize: "2em",
  },
});

/*::
type Props = {
  count: number | typeof undefined
};
*/
const Counter = (props /*: Props */) /*: string */ => {
  const [state /*: AppState */, dispatch] = useContext(AppContext);
  const [count /*: number */, setCount] = useState(props.count);

  useEffect(() => {
    if (typeof state.count !== "undefined") {
      setCount(state.count);
    }
  });

  // console.log(props.count.isInteger());
  return html`
    <div className="${styles.container}">
      <h1 data-cy="heading" className="${styles.heading}">
        No build step.
      </h1>
      <h2 data-cy="subheading" className="${styles.heading}">
        No script tags
      </h2>
      <div>
        <h2 data-cy="number-display" className="${styles.counter}">${count}</h2>
        <button
          data-cy="minus"
          className="${styles.buttons}"
          onClick=${(e) => {
            dispatch({ type: "subtract", payload: count });
          }}
        >
          -
        </button>
        <button
          data-cy="plus"
          className="${styles.buttons}"
          onClick=${(e) => {
            dispatch({ type: "add", payload: count });
          }}
        >
          +
        </button>
      </div>
    </div>
  `;
};

export default Counter;

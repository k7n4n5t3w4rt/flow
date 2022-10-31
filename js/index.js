import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import BubbleSort from "./BubbleSort.js";
import registerServiceWorker from "./registerServiceWorker";
const finishCounter = {
  ALGORITHMS: [],
  COUNT: 0,
};
ReactDOM.render(
  <BubbleSort finishCounter={finishCounter} />,
  document.getElementById("root"),
);
registerServiceWorker();

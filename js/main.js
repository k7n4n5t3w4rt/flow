// @flow
import { h, hydrate, render } from "../web_modules/preact.js";
import App from "./App.js";
import { html } from "../web_modules/htm/preact.js";

hydrate(html` <${App} /> `, document.getElementById("goodthing"));

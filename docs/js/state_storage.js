// @flow
import conf from "./config.js";

const getItem /*: function */ = (
  itemName /*: string */,
  rememberMe /*: boolean | typeof undefined */ = conf.REMEMBER_ME,
) /*: string | null | typeof undefined */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    if (typeof rememberMe !== "undefined" && rememberMe === true) {
      //
      // Load data from sessionStorage
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage
      return localStorage.getItem(itemName);
    } else {
      return sessionStorage.getItem(itemName);
    }
  } else {
    return "{}";
  }
};

const setItem /*: function */ = (
  itemName /*: string */,
  itemValue /*: Object */,
  rememberMe /*: boolean | typeof undefined */ = conf.REMEMBER_ME,
) /*: void */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    if (typeof rememberMe !== "undefined" && rememberMe === true) {
      //
      // Load data from sessionStorage
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage
      sessionStorage.clear();
      localStorage.setItem(itemName, itemValue);
    } else {
      localStorage.clear();
      sessionStorage.setItem(itemName, itemValue);
    }
  }
};

const clear /*: function */ = (
  rememberMe /*: boolean | typeof undefined */ = conf.REMEMBER_ME,
) /*: void */ => {
  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    if (typeof rememberMe !== "undefined" && rememberMe === true) {
      //
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  }
};
export default { getItem, setItem, clear };

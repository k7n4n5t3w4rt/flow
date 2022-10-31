// @flow
let NODE_ENV /*: string */ = "development";
let REMEMBER_ME /*: boolean */ = false;
if (typeof process === "undefined" || process.release.name !== "node") {
  NODE_ENV = window.NODE_ENV;
  REMEMBER_ME = window.REMEMBER_ME;
}

export default {
  NODE_ENV,
  REMEMBER_ME,
};

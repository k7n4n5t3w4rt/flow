// @flow
import shouldFunction from "../web_modules/should/as-function.js";
import fs from "fs";

export { shouldFunction as should };

/*::
  type promiseFunction = (any) => Promise<any>;
*/
export const test = (
  message /*: string */,
  testFunction /*: function */,
  skip /*: "skip" | boolean */ = false,
) /*: void */ => {
  if (!skip !== "skip") {
    try {
      testFunction();
      console.log("ok - " + message, ":)");
    } catch (e) {
      console.log("not ok - " + message, ":(");
      console.error(e.message);
    }
  }
};

export const testPromise = (
  message /*: string */,
  testFunction /*: promiseFunction */,
  skip /*: "skip" | boolean */ = false,
) /*: void */ => {
  if (skip !== "skip") {
    testFunction()
      .then(() => {
        console.log("ok - " + message, ":)");
      })
      .catch(e => {
        console.log("not ok - " + message, ":(");
        console.error(e.message);
      });
  }
};

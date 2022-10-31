// @flow
import conf from "./config.js";
import { appPaths } from "./static_config.js";
import requestPromise from "./request_promise.js";
import { copyStaticFiles } from "./static_generate.js";
/*::
import typeof { appPaths as AppPathsType } from "./static_config.js";
import RequestPromiseType from "./request_promise.js";
*/

copyStaticFiles();

const appPathArray /*: Array<string> */ = appPaths();

const generateStaticIndexFile = (
  url /*: string */,
) /*: Promise<any> | void*/ => {
  console.log("Generating...", url + "?generate=true");
  return requestPromise({
    hostname: "localhost",
    port: 4000,
    method: "GET",
    path: url + "?generate=true",
  })
    .then(() /*: void */ => {
      console.log(`Done: [`, url, `]`);
      const nextUrl = appPathArray.pop();
      if (typeof nextUrl !== "undefined") {
        generateStaticIndexFile(nextUrl);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};
generateStaticIndexFile(appPathArray.pop());

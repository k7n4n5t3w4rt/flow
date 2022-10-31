// @flow
import { test, testPromise, should } from "../server/testy.js";
import staticCache from "../server/static_cache.js";
import requestPromise from "../server/request_promise.js";
import fs, { read } from "fs";

test("Cache | Clearing the cache", () /*: void */ => {
  should(staticCache.clearCache()).be.exactly(true);
});

test("Cache | Writing to /index.html", () /*: boolean */ => {
  const cachedFilePath /*: string */ = "/";

  return should(
    staticCache.writeToCache(cachedFilePath, "Testy test"),
  ).be.exactly(true);
});

test("Cache | Reading from /index.html", () /*: boolean */ => {
  const cachedFilePath /*: string */ = "/";

  if (
    should(staticCache.readFromCache(cachedFilePath, 0, true)).be.exactly(
      "Testy test",
    )
  ) {
    fs.unlink("./public" + cachedFilePath + "index.html", (
      e /*: Error | null | typeof undefined */,
    ) /*: void */ => {
      if (e) {
        console.error(e);
      }
    });
    return true;
  } else {
    return false;
  }
});

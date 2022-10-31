// @flow
import fs from "fs";
import path from "path";
/*::
import typeof { appPaths as AppPathsType } from "./static_config.js";
import RequestPromiseType from "./request_promise.js";
*/

export const copyStaticFiles = () /*: void */ => {
  const copyDir = function (src, dest = "./") {
    let publicDest /*: string */ = "";
    const files = fs.readdirSync(src);
    for (let i = 0; i < files.length; i++) {
      const current = fs.lstatSync(path.join(src, files[i]));
      publicDest = "./" + path.join(dest, files[i]);
      if (!fs.existsSync(path.dirname(publicDest))) {
        fs.mkdirSync(path.dirname(publicDest), { recursive: true });
      }
      if (current.isDirectory()) {
        copyDir(path.join(src, files[i]), publicDest);
      } else {
        fs.copyFileSync(path.join(src, files[i]), publicDest);
      }
    }
  };

  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }
  // Copy in the static files
  fs.copyFileSync("404.html", "./public/404.html");
  fs.copyFileSync("modernizr-config.json", "./public/modernizr-config.json");
  fs.copyFileSync("browserconfig.xml", "./public/browserconfig.xml");
  fs.copyFileSync("favicon.ico", "./public/favicon.ico");
  fs.copyFileSync("humans.txt", "./public/humans.txt");
  fs.copyFileSync("icon.png", "./public/icon.png");
  fs.copyFileSync("index.html", "./public/index.html");
  fs.copyFileSync("robots.txt", "./public/robots.txt");
  fs.copyFileSync("site.webmanifest", "./public/site.webmanifest");
  fs.copyFileSync("tile-wide.png", "./public/tile-wide.png");
  fs.copyFileSync("tile.png", "./public/tile.png");
  copyDir("js", "./public/js");
  copyDir("img", "./public/img");
  copyDir("css", "./public/css");
  copyDir("web_modules", "./public/web_modules");
};

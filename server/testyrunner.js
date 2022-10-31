// @flow
import glob from "glob";
import { exec } from "child_process";

let counter /*: number */ = 0;
const testyExecs /*: Array<Promise<Array<string>>> */ = [];
glob("**/*.testy.js", function (e, testies) {
  testies.forEach((testyFilePath /*: string */) /*: void */ => {
    testyExecs.push(
      new Promise((resolve, reject) => {
        exec(`node ${testyFilePath}`, (e, stdout, stderr) => {
          if (e) {
            ++counter;
            resolve([`${e.message}...${stderr}`]);
          }
          let messageString = stdout.trim();
          if (stderr) {
            const notOks /*: Array<string> */ = stderr.split(/\r?\n/) || [];
            const trimmedNotOks = notOks.map((
              currentElement /*: string */,
            ) /*: string */ => currentElement.trim());
            // Get rid of the stupid NodeJS es module warning
            const filtered = trimmedNotOks.filter((
              currentElement /*: string */,
            ) /*: boolean */ => {
              return (
                currentElement.indexOf(
                  "ExperimentalWarning: The ESM module loader is experimental",
                ) === -1 && currentElement !== ""
              );
            });
            if (filtered.length) {
              messageString += " - " + filtered.join(" ~ ");
            }
          }
          const messages /*: Array<string> */ =
            messageString.split(/\r?\n/) || [];
          const filteredMessages = messages.filter(
            (currentElement /*: string */) /*: boolean */ =>
              currentElement !== "",
          );
          resolve(messages);
        });
      }),
    );
  });
  Promise.all(testyExecs)
    .then((results /*: Array<Array<string>> */) /*: void */ => {
      const flatMessages /*: Array<string>*/ = [];
      results.forEach((oksOrNotOk /*: Array<string> */) /*: void */ => {
        oksOrNotOk.forEach((message /*: string */) /*: void */ => {
          ++counter;
          flatMessages.push(message.replace(/ok/, `ok ${counter}`));
        });
      });
      console.log(`1..${flatMessages.length}`);
      flatMessages.forEach((message /*: string */) /*: void */ => {
        console.log(message);
      });
    })
    .catch((fail /*: string */) /*: void */ => {
      console.log(fail);
    });
});

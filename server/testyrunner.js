// @flow
import glob from "glob";
import { exec } from "child_process";

let counter /*: number */ = 0;
const testyExecs /*: Array<() => Promise<Array<string>>> */ = [];
console.log("THERE SHOULD BE 0 TESTIES", testyExecs.length);
glob("**/*.testy.js", function (e, testies) {
  testies.forEach(async (testyFilePath /*: string */) /*: Promise<void> */ => {
    console.log("PROCESSING: ", testyFilePath);
    testyExecs.push(async () /*: Promise<Array<string>> */ => {
      return new Promise((resolve) => {
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
      });
    });

    const faucetMessages /*: Array<Array<string>>*/ = await testyExecs.reduce(
      async (
        carry /*: Promise<Array<Array<string>>> */,
        testyExec /*: () => Promise<Array<string>> */,
      ) /*: any */ => {
        const flatMessages /*: Array<string>*/ = [];
        const oksOrNotOk = await testyExec();
        oksOrNotOk.forEach((message /*: string */) /*: void */ => {
          // console.log("ADDING MESSAGE TO THE flatMessages", message);
          ++counter;
          flatMessages.push(message.replace(/ok/, `ok ${counter}`));
        });
        return flatMessages;
      },
      Promise.resolve([]),
    );
    const flatFaucetMessages = faucetMessages.flat();
    // console.log("HERE");
    console.log(`1..${flatFaucetMessages.length}`);
    flatFaucetMessages.forEach((message /*: string */) /*: void */ => {
      console.log(message);
    });
  });
});

// .catch((fail /*: string */) /*: void */ => {
//   console.log(fail);
// });

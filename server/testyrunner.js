// @flow
import glob from "glob";
import { exec } from "child_process";

let counter /*: number */ = 0;

glob("**/*.testy.js", async (e /*: Error */, testies /*: Array<string> */) => {
  console.log("STARTING TO BUILD UP testyExecs...");
  const testyExecs /*: Array<() => Promise<Array<string>>> */ = await testies.reduce(
    async (
      carry /*: Promise<Array<() => Promise<Array<string>>>> */,
      testyFilePath /*: string */,
    ) /*:Promise<any> */ => {
      console.log("PROCESSING: ", testyFilePath);
      return () /*: Promise<Array<string>> */ => {
        return new Promise((resolve) => {
          console.log("NEVER GETS CALLED FOR ", testyFilePath);
          exec(`node ${testyFilePath}`, processExecMessages(resolve));
        });
      };
    },
    Promise.resolve([]),
  );
  console.log("testyExecs: ", testyExecs);
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

// .catch((fail /*: string */) /*: void */ => {
//   console.log(fail);
// });

const experimentalWarningFilter = (currentElement /*: string */) => {
  return (
    currentElement.indexOf(
      "ExperimentalWarning: The ESM module loader is experimental",
    ) === -1 && currentElement !== ""
  );
};

const processExecMessages = (resolve /*: function */) => (
  e /*: Error */,
  stdout /*: function */,
  stderr /*: function */,
) /*: void */ => {
  console.log("processExecMessages: ", counter + 1);
  if (e) {
    ++counter;
    resolve([`${e.message}...${stderr}`]);
  }
  let messageString = stdout.trim();
  if (stderr) {
    const notOks /*: Array<string> */ = stderr.split(/\r?\n/) || [];
    const trimmedNotOks = notOks.map((currentElement /*: string */) =>
      currentElement.trim(),
    );
    // Get rid of the stupid NodeJS es module warning
    const filtered = trimmedNotOks.filter(experimentalWarningFilter);
    if (filtered.length) {
      messageString += " - " + filtered.join(" ~ ");
    }
  }
  const messages /*: Array<string> */ = messageString.split(/\r?\n/) || [];
  const filteredMessages = messages.filter(
    (currentElement /*: string */) => currentElement !== "",
  );
  resolve(messages);
};

// @flow
export default (seedString /*: string */ = "NOT VERY RANDOM") /*: number */ => {
  return parseInt(
    seedString.split("").reduce(
      (acc /*: string */, letter /*: string */) /*: string */ => {
        const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
        return acc + letterCode.toString();
      },
      "",
    ),
  );
};

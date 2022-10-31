import http from "http";

// A handy http.request that returns a promise
export const requestPromise = (
  options /*: http$requestOptions */,
) /*: Promise<any> */ => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let chunks /*: Array<Buffer> */ = [];
      res
        .on("data", chunk => {
          chunks.push(chunk);
        })
        .on("end", () => {
          const body /*: string */ = Buffer.concat(chunks).toString(); // at this point, `body` has the entire response body stored in it as a string
          resolve({ res, body });
        });

      res.on("error", error => {
        reject(error);
      });
    });
    req.end();
  });
};

export default requestPromise;

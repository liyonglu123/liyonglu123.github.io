const http = require("http");

http
  .createServer((request, response) => {
    let body = [];
    request
      .on("error", (err) => {
        console.error(err);
      })
      .on("data", (chunk) => {
        // body.push(chunk.toString());
        body.push(Buffer.from(chunk));
      })
      .on("end", () => {
        // TypeError [ERR_INVALID_ARG_TYPE]: The "list[0]" argument must be an instance of Buffer or Uint8Array
        // https://stackoverflow.com/questions/10623798/how-do-i-read-the-contents-of-a-node-js-stream-into-a-string-variable
        body = Buffer.concat(body).toString("utf8");
        console.log("body:", body);
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(" Hello World\n");
      });
  })
  .listen(8088);

console.log("server started");

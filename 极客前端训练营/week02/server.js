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
        response.writeHead(200, { "Content-Type": "text/html" });
        response.end(
          `<html maaa="a">
          <head>
            <style>
              body div #myid {
                width: 100px;
                background-color: #ff5000;
              }
              body div img {
                width: 30px;
                background-color: #ff1111;
              }
            </style>
          </head>
          <body>
            <div>
              <img id="myid" />
              <img />
            </div>
          </body>
        </html>`
        );
      });
  })
  .listen(8088);

console.log("server started");

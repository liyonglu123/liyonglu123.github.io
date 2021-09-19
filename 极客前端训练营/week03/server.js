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
              #container {
                display: flex;
                width: 500px;
                height: 300px;
                background-color: rgb(255,255,255)
              }
              #container #myid {
                width: 200px;
                height: 100px;
                background-color: rgb(255,0,0)
              }
              #container .c1 {
                flex: 1;
                background-color: rgb(0,255,0)
              }
            </style>
          </head>
          <body>
            <div id="container">
              <div id="myid"></div>
              <div class="c1"></div>
            </div>
          </body>
        </html>`
        );
      });
  })
  .listen(8088);

console.log("server started");

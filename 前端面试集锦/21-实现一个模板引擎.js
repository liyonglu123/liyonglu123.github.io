/**
 * 使用with语法+ 字符串拼接 + new Function 来实现
 * 1. 先将字符串中的 <%=%> 替换掉，拼出一个结果的字符串
 * 2. 再采用new Function的方式执行该字符串，并且使用with解决作用域的问题
 */

// ===== template.html =====
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Document</title>
// </head>
// <body>
//   {{name}}  {{age}}
//   {%arr.forEach(item => {%}
//       <li>{{item}}</li>
//   {%})%}
// </body>
// </html>

const fs = require("fs");
const path = require("path");

const renderFile = (filePath, obj, cb) => {
  fs.readFile(filePath, "utf8", function (err, html) {
    if (err) {
      return cb(err, html);
    }

    html = html.replace(/\{\{([^}]+)\}\}/g, function () {
      console.log(arguments[1], arguments[2]);
      let key = arguments[1].trim();
      return "${" + key + "}";
    });

    let head = `let str = '';\r\n with(obj){\r\n`;
    head += "str+=`";
    html = html.replace(/\{\%([^%]+)\%\}/g, function () {
      return "`\r\n" + arguments[1] + "\r\nstr+=`\r\n";
    });
    let tail = "`}\r\n return str;";
    let fn = new Function("obj", head + html + tail);
    cb(err, fn(obj));
  });
};

renderFile(
  path.resolve(__dirname, "my-template.html"),
  { name: "tom", age: 27, arr: [1, 2, 3] },
  function (err, data) {
    console.log(data);
  }
);

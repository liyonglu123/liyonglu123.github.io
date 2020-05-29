const experss = require("express");
const app = experss();

app.use("/", async (req, res) => {
  res.json({
    name: "zhangsan",
  });
});

app.listen(3000, () => {
  console.log("服务启动成功！");
});

// utility 工具类
const express = require("express")
const utility = require("utility")
// 创建express实例
const app = express()

const port = 3000

app.get("/", (req, res) => {
    // get: req.query   post:req.body
    var q = req.query.q
    var md5Value = utility.md5(q)
    res.send(md5Value)
})
app.listen(port, ()=> console.log(`example app listening on port ${port}`))
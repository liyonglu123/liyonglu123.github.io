// 搭建简单的express 应用
const express = require("express")
const app = express()
const port = 3000
app.get("/", (req, res) => {
    res.send("hello world!")
})

app.listen(port, ()=> console.log(`example app listening on port ${port}`))





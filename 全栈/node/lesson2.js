// 使用 superagent  和 cheerio 实现简单爬虫
// superagent 抓取网页  cheerio分析网页 类似于jquery

const express = require("express")
const superagent = require("superagent")
const cheerio = require("cheerio")

const app = express()
const port = 3000
app.get("/", (req, res, next) => {
    // 使用superagent 抓取 https://cnodejs.org/的内容
    superagent.get("https://cnodejs.org/")
        .end((err, sres) => {
            // 错误处理
            if(err) {
                return next(err)
            }
            const $ = cheerio.load(sres.text)
            let items = []
            $("#topic_list .topic_title").each((index, element)=> {
                var $element = $(element)
                items.push({
                    title: $element.attr("title"),
                    href: $element.attr("href"),
                    
                })
            })
            res.send(items)
        })
})  
app.listen(port, ()=> console.log(`example app listening on port ${port}`))

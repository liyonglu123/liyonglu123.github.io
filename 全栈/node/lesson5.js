// 实现抓包
// 使用 superagent  和 cheerio 实现简单爬虫
// superagent 抓取网页  cheerio分析网页 类似于jquery
// eventproxy 事件异步 并发

const express = require("express")
const superagent = require("superagent")
const cheerio = require("cheerio")

// url是node标准中的模块   http://nodejs.org/api/url.html
const url = require("url")
var async = require('async');
const cnodeUrl = "https://cnodejs.org/"
const app = express()
const port = 3000
let concurrencyCount = 0; // 当前并发数
let maxLimit = 10
// 使用superagent 抓取 https://cnodejs.org/的内容
let fetchUrl = function (url, callback) {
    concurrencyCount++;    
    let lastTime = Date.now()
    superagent.get(url)
        .end((err, res) => {
            // 错误处理
            if (err) {
                return console.log("err:", err)
            }
            let nowTime = Date.now()
            let delay = nowTime - lastTime
            console.log(`现在的并发数是${concurrencyCount}--正在抓取的是${url}--耗时${delay}毫秒`);
            concurrencyCount--;
            let $ = cheerio.load(res.text)
            let topics = {
                title: $('.topic_full_title').text().trim(),
                href: url,
                comment1: $('.markdown-text').eq(0).text().trim(),
            }
            callback(null, topics.title)  
        })
  };
  
// app.get("/", (req, res, next) => {
    superagent.get(cnodeUrl)
        .end((err, sres)=> {
            // 错误处理
            if (err) {
                return console.log(err)
            }
            const topicUrls = []
            const $ = cheerio.load(sres.text);
            // 获取首页所有连接
            $("#topic_list .topic_title").each((index, element) => {
                let $element = $(element)
                // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
                // 我们用 url.resolve 来自动推断出完整 url，变成
                // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
                // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
                let href = url.resolve(cnodeUrl, $element.attr("href"))
                topicUrls.push(href)
                
            })
            console.log(topicUrls)
            async.mapLimit(topicUrls, maxLimit, function (url, callback) {
                fetchUrl(url, callback);
              }, function (err, result) {
                console.log('final:');
                console.log(result);
              });
        })
// })
// app.listen(port, () => console.log(`example app listening on port ${port}`))


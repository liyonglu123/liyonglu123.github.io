// 使用 superagent  和 cheerio 实现简单爬虫
// superagent 抓取网页  cheerio分析网页 类似于jquery
// eventproxy 事件异步 并发

const express = require("express")
const superagent = require("superagent")
const cheerio = require("cheerio")

const eventproxy = require("eventproxy") // 计数器的原理实现等等
// url是node标准中的模块   http://nodejs.org/api/url.html
const url = require("url")

const cnodeUrl = "https://cnodejs.org/"
const app = express()
const port = 3000
// 使用superagent 抓取 https://cnodejs.org/的内容
app.get("/", (req, res, next) => {
    superagent.get(cnodeUrl)
        .end((err, sres) => {
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
            // 获取一个eventproxy 实例
            let ep = new eventproxy()
            // 命令 ep 重复监听 topicUrls.length 次（在这里也就是 40 次） `topic_html` 事件再行动
            ep.after("topic_html", topicUrls.length, topics => {
                // topics 是个数组 包含了40 次ep.emit("topic_html", pair) 中的pair
                // 开始行动
                topics = topics.map(topicPari => {
                    let topicUrl = topicPari[0]
                    let topicHtml = topicPari[1]
                    let $ = cheerio.load(topicHtml)
                    return ({
                        title: $('.topic_full_title').text().trim(),
                        href: topicUrl,
                        comment1: $('.reply_content').eq(0).text().trim(),
                    })
                })
                console.log('final:', topics);
                res.send(topics)
            })

            topicUrls.forEach(topicUrl => {
                superagent.get(topicUrl)
                    .end((err, res) => {
                        console.log('fetch ' + topicUrl + ' successful');
                        ep.emit('topic_html', [topicUrl, res.text]);
                    })
            })
        })

})
app.listen(port, () => console.log(`example app listening on port ${port}`))
// jsonp
window.handleData = function(data){
    // ...
}
let script = document.createElement("script");
script.src = "https://xxxx.com/v0/search?q=xuxi&callback=handleData";
document.body.insertBefore(script, document.body.firstChild);
// cros
// cors跨域是目前我们用的比较多的本地调试方式，原理就是在服务端设置响应头header的Access-Control-Allow-Origin字段，
// 这样浏览器检测到header中的Access-Control-Allow-Origin，这样就可以跨域了。

// postMessage实现跨域通信
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event){
  let origin = event.origin || event.originalEvent.origin; 
  if (origin !== "http://aaa:8080")
    return;

  // ...
  console.log(event.data)
}
// 派发消息的页面
winB.postMessage(_({text: '休息休息'}), origin)

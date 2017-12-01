// 定义列表的数据
var dataList = [
    {
        id: 1,
        title: '张三',
        content: '张三的内容'
    },
    {
        id: 2,
        title: '李四',
        content: '李四的内容'
    },
    {
        id: 3,
        title: '王五',
        content: '王五的内容'
    }
];
// 获取列表的元素，动态添加数据tr  第一种方法是完全的字符串的拼接 使用的转移字符等等的问题
var container = document.getElementById('blog-main');
var tablePre = '<table id="blog-table"  border="1" cellspacing="0" cellpadding="0"><caption>博客</caption><thead><tr><td>序号</td><td>标题</td><td>内容</td><td>操作</td></tr></thead>';
var tbodypre = '<tbody>';
// 遍历数组展示数据
for(var i=0; i<dataList.length; i++ ){
    // debugger
    var eachtr = "<tr><td>"+dataList[i].id+"</td>"+"<td>"+dataList[i].title+"</td>"+"<td>"+dataList[i].content+"</td>"+"<td>"+"<button onclick='goEdit("+JSON.stringify(dataList[i])+")'>编辑</button>"+"</td></tr>";
    tbodypre+= eachtr; 
}
tbodypre +='</tbody>'
tablePre+=tbodypre;
var tableAfter = '</table>'
var table = tablePre +tableAfter
container.innerHTML = table;
// js 动态创建标签并添加元素

function goEdit(e){
    window.location.href = '../editBlog/editBlog.html?id='+e.id
}

function addData(e){
    debugger
    var oldTable = document.getElementById('oldtable');
    var tr = document.createElement('tr');
    var text = document.createTextNode('yihang')
    tr.appendChild(text); 
    // 元素的创建的问题 和删除等等  不是块状的元素
    // tr.style.height = 40 + 'px'
    tr.style.backgroundColor = 'red'
    oldTable.appendChild(tr);
}
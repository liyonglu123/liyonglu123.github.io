var txt = document.querySelector('#txt');
var list = document.querySelector('.list');
var listItem = document.querySelector('.list-item');
var images = document.querySelector('.images');
var name = document.querySelector('.name');
var des = document.querySelector('.des');
var price = document.querySelector('.price');

var data = [
  {imagesUrl:"images/note4.jpg",nameT:"红米Note 4",des:"Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",price:"899元 起"},
  {imagesUrl:"images/pro.jpg",nameT:"红米Pro",des:"硬件级实时背景虚化 / Helio X20 十核旗舰处理 / 5.5” OLED 超鲜艳屏幕 / 拉丝全金属机身",price:"1499元 起"},
  {imagesUrl:"images/max.jpg",nameT:"小米Max全网通",des:"6.44 大屏黄金尺寸 / 4850mAh 大电量 / 指纹识别 / 2.5D玻璃",price:"1299元 起"},
  {imagesUrl:"images/TV.jpg",nameT:"分体电视",des:"全金属轻薄机身 / 次世代分体电视",price:"3999元 起"},
  {imagesUrl:"images/xiaoMiCase.jpg",nameT:"小米盒子3",des:"全新升级64位 4K网络机顶盒 / 标配小米蓝牙语音体感遥控器",price:"249元"}
];

// 初始化 list 控件
function initControl(data){
  var imagesPic ="";
  var nameText = "";
  var desText = "";
  var priceText ="";
  data.forEach(function(item){
    // strHtml+='<li>' + item.name + '</li>';
    strHtml +='<div>'

    imagesPic += item.imagesUrl;
    nameText+= item.nameT;
    desText += item.des;
    priceText += item.price;

  });
  images.innerHTML = imagesPic;
  name.innerHTML = nameText;
  des.innerHTML= desText;
  price.innerHTML= priceText;
}
initControl(data);

//为文本框添加键盘事件
txt.onkeyup = function(a){
  var str = txt.value;
  var result = data.filter(function(item){
    if (item.name.toLowerCase()==str.toLowerCase()) {
      return item;
    }
    // if (item.name.toLowerCase().indexOf(str.toLowerCase())>-1) {
    //   return item;
    // }
  });
  initControl(result);
};

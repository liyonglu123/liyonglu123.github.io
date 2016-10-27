var data = [{
    title: "红米Note 4",
    description: "Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",
    price: "899元 起"
},{
    title: "Apple 7",
    description: "Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",
    price: "899元 起"
},{
    title: "Apple 6 Plus",
    description: "Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",
    price: "899元 起"
},{
    title: "小米5 pro",
    description: "Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",
    price: "899元 起"
},{
    title: "Apple 18 Plus",
    description: "Helio X20 十核旗舰处理器 / 全金属一体化机身 / 4100mAh 大电量",
    price: "899元 起"
}];

var list = document.querySelector('#list');
var txt = document.querySelector('#search');

txt.onkeyup = function() {
    var result = data.filter(function(item) {
        if (item.title.toLowerCase().indexOf(txt.value.toLowerCase())>-1 ||
            item.description.toLowerCase().indexOf(txt.value.toLowerCase())>-1
        ){
          return item;
        }
    });
    initCtrl(result);
}
initCtrl(data);
function initCtrl(data){
  var strHtml = '';
  data.forEach(function(item) {
      strHtml += `<div class="p-item">
      <div class="p-item-img">
        <img src="images/p.jpg" alt="">
      </div>
      <div class="p-item-info">
        <div class="p-info-title">
          ${item.title}
        </div>
        <div class="p-info-desc">
          ${item.description}
        </div>
        <div class="p-info-price">
          ${item.price}
        </div>
      </div>
    </div>`;
  });

  list.innerHTML = strHtml;
}

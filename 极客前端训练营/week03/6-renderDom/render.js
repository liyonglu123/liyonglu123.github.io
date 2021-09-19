const images = require("images");

function render(viewport, element) {
  if (element.style) {
    var img = images(element.style.width, element.style.height);

    if (element.style["background-color"]) {
      var color = element.style["background-color"] || "rgb(0,0,0)";
      color.match(/rgb\((\d+),(\d+),(\d+)\)/);
      img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3));
      // img.fill(255, 0, 0);
      viewport.draw(img, element.style.left || 0, element.style.top || 0);
    }
  }

  // 递归渲染dom
  if (element.children) {
    for (var child of element.children) {
      render(viewport, child);
    }
  }
}

module.exports = render;

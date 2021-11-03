/**
 * 容器的定位是absolute或者fixed
 * 文案不能被选中
 * 拖拽的边界问题
 * 鼠标超出边界失焦问题
 *
 *
 * 问题：
 *      对常见的宽高分不清楚
 */
let injectedHTML = document.createElement("DIV");
injectedHTML.innerHTML =
  '<dragBox id="dragBox" class="drag-box">\
  <dragBoxBar id="dragBoxBar" class="no-select"></dragBoxBar>\
  <injectedBox id="injectedBox">CONTENT</injectedBox>\
  </dragBox>';

document.body.appendChild(injectedHTML);

let isMouseDown,
  initX,
  initY,
  height = injectedBox.offsetHeight,
  width = injectedBox.offsetWidth,
  dragBoxBar = document.getElementById("dragBoxBar");

dragBoxBar.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  document.body.classList.add("no-select");
  injectedBox.classList.add("pointer-events");
  initX = e.offsetX;
  initY = e.offsetY;
  dragBox.style.opacity = 0.5;
});

dragBoxBar.addEventListener("mouseup", function (e) {
  mouseupHandler();
});

document.addEventListener("mousemove", function (e) {
  if (isMouseDown) {
    let cx = e.clientX - initX,
      cy = e.clientY - initY;
    if (cx < 0) {
      cx = 0;
    }
    if (cy < 0) {
      cy = 0;
    }
    if (window.innerWidth - e.clientX + initX < width + 16) {
      cx = window.innerWidth - width;
    }
    if (
      e.clientY >
      window.innerHeight - height - dragBoxBar.offsetHeight + initY
    ) {
      cy = window.innerHeight - dragBoxBar.offsetHeight - height;
    }
    dragBox.style.left = cx + "px";
    dragBox.style.top = cy + "px";
  }
});

document.addEventListener("mouseup", function (e) {
  if (
    e.clientY > window.innerWidth ||
    e.clientY < 0 ||
    e.clientX < 0 ||
    e.clientX > window.innerHeight
  ) {
    mouseupHandler();
  }
});

function mouseupHandler() {
  isMouseDown = false;
  document.body.classList.remove("no-select");
  injectedBox.classList.remove("pointer-events");
  dragBox.style.opacity = 1;
}

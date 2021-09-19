function getStyle(element) {
  if (!element.style) {
    element.style = {};
  }

  for (var prop in element.computedStyle) {
    var p = element.computedStyle.value;
    element.style[prop] = element.computedStyle[prop].value;

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop]);
    }
  }
  return element.style;
}

function layout(element) {
  // 1. 预处理
  if (!element.computedStyle) {
    return;
  }
  var elementStyle = getStyle(element);
  if (elementStyle.display !== "flex") {
    return;
  }
  var items = element.children.filter((e) => e.type === "element");

  // 支持order
  items.sort(function (a, b) {
    return (a.order || 0) - (b.order || 0);
  });

  // 取出处理后的style
  var style = elementStyle;

  ["width", "height"].forEach((size) => {
    if (style[size] === "auto" || style[size] === "") {
      style[size] = null;
    }
  });

  // 设置相关属性的默认值
  if (!style.flexDirection || style.flexDirection === "auto") {
    style.flexDirection = "row";
  }
  if (!style.alignItems || style.alignItems === "auto") {
    style.alignItems = "stretch";
  }
  if (!style.justifyContent || style.justifyContent === "auto") {
    style.justifyContent = "flex-start";
  }
  if (!style.flexWrap || style.flexWrap === "auto") {
    style.flexWrap = "nowrap";
  }
  if (!style.alignContent || style.alignContent === "auto") {
    style.alignContent = "stretch";
  }

  var mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase;
  if (style.flexDirection === "row") {
    // mainSize,mainSign, mainBase 用于后续的计算
    mainSize = "width";
    mainStart = "left";
    mainEnd = "right";
    mainSign = +1;
    mainBase = 0;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "row-reverse") {
    mainSize = "width";
    mainStart = "right";
    mainEnd = "left";
    mainSign = -1;
    mainBase = style.width;

    crossSize = "height";
    crossStart = "top";
    crossEnd = "bottom";
  }
  if (style.flexDirection === "column") {
    mainSize = "height";
    mainStart = "top";
    mainEnd = "bottom";
    mainSign = +1;
    mainBase = 0;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexDirection === "column-reverse") {
    mainSize = "height";
    mainStart = "bottom";
    mainEnd = "top";
    mainSign = -1;
    mainBase = style.height;

    crossSize = "width";
    crossStart = "left";
    crossEnd = "right";
  }
  if (style.flexWrap === "wrap-reverse") {
    var temp = crossStart;
    crossStart = crossEnd;
    crossEnd = temp;
    crossSign = -1;
  } else {
    crossBase = 0;
    crossSign = 1;
  }

  // 2. 分行
  var isAutoMainSize = false;
  if (!style[mainSize]) {
    // auto sizing
    elementStyle[mainSize] = 0;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      // 计算子元素的样式
      var itemStyle = getStyle(item);
      if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== void 0) {
        elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
      }
    }
    isAutoMainSize = true;
  }

  var flexLine = [];
  var flexLines = [flexLine];

  // 剩余空间为父元素的mainSize
  var mainSpace = elementStyle[mainSize];
  var crossSpace = 0;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    var itemStyle = getStyle(item);
    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0;
    }

    // 元素设置了flex属性
    if (itemStyle.flex) {
      flexLine.push(item);
    } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
      mainSpace -= itemStyle[mainSize];
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        // 交叉轴去高度最高的值
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      flexLine.push(item);
    } else {
      if (itemStyle[mainSize] > style[mainSize]) {
        itemStyle[mainSize] = style[mainSize];
      }
      if (mainSpace < itemStyle[mainSize]) {
        // 元素换行显示
        flexLine.mainSpace = mainSpace;
        flexLine.crossSpace = crossSpace;
        flexLine = [item];
        flexLines.push(flexLine);
        // 重置行信息
        mainSpace = style[mainSize];
        crossSpace = 0;
      } else {
        flexLine.push(item);
      }
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        // 交叉轴去高度最高的值
        crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
      }
      mainSpace -= itemStyle[mainSize];
    }
  }
  // 元素没有了
  flexLine.mainSpace = mainSpace;
}

module.exports = layout;

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

  // 3. 计算主轴
  if (style.flexWrap === "nowrap" || isAutoMainSize) {
    flexLine.crossSpace =
      style[crossSize] !== undefined ? style[crossSize] : crossSpace;
  } else {
    flexLine.crossSpace = crossSpace;
  }

  if (mainSpace < 0) {
    // overflow (happens only if container is single line), scale every item
    // 若剩余空间为负数，所有 flex 元素为 0，等比压缩剩余元素
    var scale = style[mainSize] / (style[mainSize] - mainSpace);
    var currentMain = mainBase;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);

      if (itemStyle.flex) {
        itemStyle[mainSize] = 0;
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale;
      itemStyle[mainStart] = currentMain;
      itemStyle[mainEnd] =
        itemStyle[mainStart] + mainSign * itemStyle[mainSize];
      currentMain = itemStyle[mainEnd];
    }
  } else {
    // process each flex line
    flexLines.forEach(function (items) {
      var mainSpace = items.mainSpace;
      var flexTotal = 0;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var itemStyle = getStyle(item);

        if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
          flexTotal += itemStyle.flex;
          continue;
        }
      }

      if (flexTotal > 0) {
        // there is flexible flex items
        var currentMain = mainBase;
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);

          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
          }
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd];
        }
      } else {
        // no flexible flex item , which means, justifyContent should work
        if (style.justifyContent === "flex-start") {
          var currentMain = mainBase;
          var step = 0;
        }
        if (style.justifyContent === "flex-end") {
          var currentMain = mainSpace * mainSign + mainBase;
          var step = 0;
        }
        if (style.justifyContent === "center") {
          var currentMain = (mainSpace / 2) * mainSign + mainBase;
          var step = 0;
        }
        if (style.justifyContent === "space-between") {
          var currentMain = mainBase;
          var step = (mainSpace / (items.length - 1)) * mainSign;
        }
        if (style.justifyContent === "space-around") {
          var step = (mainSpace / items.length) * mainSign;
          var currentMain = step / 2 + mainBase;
        }
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          var itemStyle = getStyle(item);
          itemStyle[mainStart] = currentMain;
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize];
          currentMain = itemStyle[mainEnd] + step;
        }
      }
    });
  }

  // 4. 计算交叉轴 align-items, align-self
  var crossSpace;
  if (!style[crossSize]) {
    // auto sizing
    crossSpace = 0;
    elementStyle[crossSize] = 0;
    for (var i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] =
        elementStyle[crossSize] + flexLines[i].crossSize;
    }
  } else {
    crossSpace = style[crossSize];
    for (var i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace;
    }
  }

  if (style.flexWrap === "wrap-reverse") {
    crossBase = style[crossSize];
  } else {
    crossBase = 0;
  }

  // 计算行高
  // var lineSize = style[crossSize] / flexLines.length;
  var step;

  if (style.alignContent === "flex-start") {
    crossBase += 0;
    step = 0;
  }
  if (style.alignContent === "flex-end") {
    crossBase += crossSign * crossSpace;
    step = 0;
  }
  if (style.alignContent === "center") {
    crossBase = (crossSign * crossSpace) / 2;
    step = 0;
  }
  if (style.alignContent === "space-between") {
    crossBase += 0;
    step = crossSpace / (flexLines.length - 1);
  }
  if (style.alignContent === "space-around") {
    step = crossSpace / flexLines.length;
    crossBase += (crossSign * step) / 2;
  }
  if (style.alignContent === "stretch") {
    crossBase += 0;
    step = 0;
  }

  flexLines.forEach(function (items) {
    var lineCrossSize =
      style.alignContent === "stretch"
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemStyle = getStyle(item);

      var align = itemStyle.alignSelf || style.alignItems;
      // TODO: itemStyle相关属性没有的话，默认值是undefined
      if (itemStyle[crossSize] === null || itemStyle[crossSize] === undefined) {
        itemStyle[crossSize] = align === "stretch" ? lineCrossSize : 0;
      }

      if (align === "flex-start") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === "flex-end") {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
        itemStyle[crossStart] =
          itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
      }
      if (align === "center") {
        itemStyle[crossStart] =
          crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2;
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize];
      }
      if (align === "stretch") {
        itemStyle[crossStart] = crossBase;
        itemStyle[crossEnd] =
          crossBase +
          crossSign *
            (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0)
            ? itemStyle[crossSize]
            : lineCrossSize;
        itemStyle[crossSize] =
          crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
      }
    }
    crossBase += crossSign * (lineCrossSize + step);
  });
  console.log(items);
}

module.exports = layout;

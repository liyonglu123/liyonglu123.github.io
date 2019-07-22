/**
 *
 * 获取指定范围内的随机数
 * @export
 * @param {*} min 最小值
 * @param {*} max 最大值
 * @returns
 */
export function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 *
 * 獲取元素的所在区域
 * @export
 * @param {*} ele
 * @returns
 */
export function getEleRect(ele) {
    let parent = document.querySelector(ele);
    // top botom width height x y left right
    return parent.getBoundingClientRect();
}

/**
 * 实现对象的深拷贝
 * @param {*} target 
 */
export function deepCopy(target) {
    if (typeof target !== 'object') return;
    //判断目标类型，来创建返回值
    var newObj = target instanceof Array ? [] : target instanceof Date ? target : {};
    if (target == null) {
        newObj = null;
        return newObj
    }

    for (var item in target) {
        //只复制元素自身的属性，不复制原型链上的
        if (target.hasOwnProperty(item)) {
            newObj[item] = typeof target[item] == 'object' ? deepCopy(target[item]) : target[item] //判断属性值类型
        }
    }
    return newObj
}
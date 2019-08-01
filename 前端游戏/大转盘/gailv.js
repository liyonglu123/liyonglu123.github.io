
/**
 * 计算中将概率
 * @param {*} listArr  奖品列表
 * @param {*} flag  是否没有库存
 */
function getChance(listArr, flag) {
    // 1. 计算总的中将概率
    totalChance = array_sum(listArr, 'chance');
    // 2. 计算每一个奖品的中奖率
    listArr.forEach(function(item) {
        // 概率值小于等于0。返回false表示未中奖
        if(item['chance'] <= 0) {
            continue;
        }
        // 循环获取到的概率小于等于随机抽取到的概率表示中奖
        else  {
            var randNum =  mt_rand(1, totalChance);
            if(randNum <= item['chance']) {
                return item;
            }else {
               if(flag) {
                totalChance -= item['chance'];
               } 
            }
        }
    }, this);
    return false;
}
/**
 * 计算数组中某一元素的总和
 * @param {*} arr 目标数组
 * @param {*} key 概率key
 */
function array_sum(arr, key) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        var item = Number(arr[i][key]);
        sum += item;
    }
    return sum;
}

/**
 * 获取两个值之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
function mt_rand(num1, num2) {
    return Math.random()*(num2-num1)+num1  
}

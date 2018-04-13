// 1. 两数之和
/**
 * 
 * @param {*} nums  目标数列
 * @param {*} target 目标值
 */
var nums = [2, 7, 11, 15],
    target = 26;
var twoSum = function (nums, target) {
    var random0 = Math.floor(nums.length * Math.random());
    var random1 = Math.floor(nums.length * Math.random());
    // var num1;
    if (random0 !== random1) {
        if (nums[random0] + nums[random1] == target) {
            return [random0, random1];
        }
        else {
            twoSum(nums, target);
        }
    }
};
// twoSum(nums, target);

// var twoSum = function(nums, target) {
//     debugger
//     var len = nums.length;
//     var exist = {};
//     for (var i = 0; i < len; i++) {
//         if (exist[target - nums[i]] !== undefined) {
//             return [exist[target - nums[i]] , i];
//         }else{
//             exist[nums[i]] = i;
//         }
//     }
// };
// var twoSum = function(nums, target) {
//     var len = nums.length;
//     for (var i = 0; i < len; i++) {
//         for (var j = i + 1; j <= len; j++) {
//             if (nums[i] + nums[j] == target) {
//                 return [i , j];
//             }
//         }
//     }
// };
// console.log(twoSum(nums, target));

// 颠倒整数  这里分为4种情况 这里注意 -10 的情况哦 颠倒之后也不可以超过范围哦 注意32int的范围问题哦
/**
 * 
 * @param {*} x 
 */
var reverseInt = function (x) {
    var str = x.toString();
    // 这是一种方式 return 0; Math.pow(2,32)
    if (x <= -Math.pow(2, 31) || Number("-" + str.substring(1).split("").reverse().join("")) <= -Math.pow(2, 31) || x >= Math.pow(2, 31) - 1 || Number(str.split("").reverse().join("")) >= Math.pow(2, 31) - 1) {
        return 0;
    }
    if (str.substring(0, 1) == "-" && str.substring(str.length - 1) == "0") {
        str = str.substring(1, str.length - 1);
        return Number("-" + str.split("").reverse().join(""));
    } else if (str.substring(0, 1) == "-" && str.substring(str.length - 1) != "0") {
        str = str.substring(1);
        return Number("-" + str.split("").reverse().join(""));
    } else if (str.substring(str.length - 1) == "0") {
        str = str.substring(0, str.length - 1);
        return Number(str.split("").reverse().join(""));
    } else {
        str = str;
        return Number(str.split("").reverse().join(""));
    }
};

/**
 * 
 * @param {*} num 整数的倒置
 */
var huiWenShu = function (num) {
    var newNumber = 0;
    while (num != 0) {
        newNumber *= 10;
        newNumber = newNumber + (num % 10);
        num = Math.floor(num / 10);
    }
    // return newNumber;
    console.log(newNumber);
}
// huiWenShu(10)
// 实现罗马数字与整数的互转。 数字大小为[1, 3999]之间。
// https://blog.csdn.net/net_wolf_007/article/details/51770112
var romanToInt = function (s) {
    var tagVal = [256];
    tagVal['I'] = 1;
    tagVal['V'] = 5;
    tagVal['X'] = 10;
    tagVal['C'] = 100;
    tagVal['M'] = 1000;
    tagVal['L'] = 50;
    tagVal['D'] = 500;
    var val = 0;
    for (var i = 0; i < s.length; i++) {
        if (i + 1 >= s.length || tagVal[s[i + 1]] <= tagVal[s[i]]) {
            val += tagVal[s[i]];
        }
        else {
            val -= tagVal[s[i]];
        }

    }
    return val;
    // console.log(val);
}

// romanToInt('MMMXLV');
// 整数转化为罗马数字
var intToRoman = function (num) {
    if (num <= 0) return "";
    var ret = "";
    var number = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var flags = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

    for (var i = 0; i < number.length && num > 0; i++) {
        de
        if (num < number[i]) continue;
        // cout<< i << " " << number[i] << " - " <<flags[i] << endl;  
        while (num >= number[i]) {
            num -= number[i];
            ret += flags[i];
        }

    }
    return ret;
    // console.log(ret); 
}
// intToRoman(4)


// 编写一个函数来查找字符串数组中最长的公共前缀字符串。
// 方法一： 
// var longestCommonPrefix = function(strs) {
//     //如果字符串数组长度是0,则返回“”，如果数组长度是1，那么直接返回这一条String
//     if(strs.length==0){
//         return "";
//     }else if(strs.length==1){
//         return strs[0];
//     }
//     var s = "";
//     //比较strs[0]的从第0位开始，每次取出一个字符比较，若数组中所有这个位的字符都相等，则加入公共字符串s，进行下个循环
//     for(var i=0; i<strs[0].length; i++){
//         for(var j=1; j<strs.length; j++){
//             //如果遍历指针到达某个元素元素末尾或者某个元素该位匹配不想等，则返回s
//             if((i>=strs[j].length) || (strs[0].charAt(i) != strs[j].charAt(i)))
//                 return s;
//         }
//         s = s+strs[0].charAt(i);
//     }
//     return s;
//     // console.log(s);
// }
// 方法二
var longestCommonPrefix1 = function (strs) {
    if (strs == null || strs.length == 0) return "";
    var pre = strs[0];
    var i = 1;
    while (i < strs.length) {
        //拿第一个做模板，匹配到数组中第一个元素的最长公共前缀字符串，然后以这个为模板，以此类推匹配下边所有的元素，最后返回最终模板
        //indexOf是检测子串并返回子串起始位置的函数
        while (strs[i].indexOf(pre) != 0)
            //如果pre不是子串，就去掉pre末尾一位重新比较，直到是子串或者pre长度0时就会跳出本次循环去匹配下一轮外循环
            pre = pre.substring(0, pre.length - 1);
        i++;
    }
    // console.log(pre)
    return pre;
}
// longestCommonPrefix1(["abcd","abcde","abcdefg"])

// 有效的括号
// 判断是不是成对的存在的问题 
const validBraces = function (str) {
    // 匹配括号  放入一个数组之中进行使用即可 正则表达式的使用
    let brackets = str.match(/[\[\]\(\)\{\}]/g),
        arr = [],
        symbol;
    for (var i in brackets) {
        switch (brackets[i]) {
        case '(':
            arr.push('(');
            break;
        case '[':
            arr.push('[');
            break;
        case '{':
            arr.push('{');
            break;
        case ')':
            symbol = arr.pop();
            if (symbol !== '(') return false;
            break;
        case ']':
            symbol = arr.pop();
            if (symbol !== '[') return false;
            break;
        case '}':
            symbol = arr.pop(); // 删除最后一个并返回最后一个元素
            if (symbol !== '{') return false;
            break

        }
    }
    // 当存在 (() 这样的情况时, 上面的都能通过, 最后需要检测一下arr的长度
    return arr.length > 0 ? false : true;
}
// 测试
// console.log(validBraces("(){}[]")); //true
// console.log(validBraces("(}")); //false
// console.log(validBraces("[(])")); //false
// console.log(validBraces("([{}])")); //true
// console.log(validBraces("}[{}])")); //true
// console.log(validBraces("([(}")); //true







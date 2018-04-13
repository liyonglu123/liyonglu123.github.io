// 合并两个有序链表  === 合并两个有序的队列的问题  和数组相结合的问题如何进行实现呢？
// https://segmentfault.com/a/1190000011647929
// 1. 声明一个节点类
function Node(key) {
    this.key = key;
    this.next = null;
}
// 2. 声明一个链表类
function LinkedList() {
    // 表示链表的长度
    this.length = 0;
    // 表示链表的头节点（第一个节点）
    this.head = null;
}
// 3. 链表插入节点的方法
LinkedList.prototype.append = function (key) {
    var node = new Node(key);
    // 如果还没有节点
    if (!this.head) {
        this.head = node;
    } else {
        // 通过循环找到最后一个节点，然后让最后一个节点指向新节点
        var current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
    }
    // 修改链表的长度
    this.length++;
}
// 4.构造两个有序链表
var arr1 = [2, 4, 6, 8];
var arr2 = [1, 2, 3, 5, 7];
var list1 = new LinkedList();
var list2 = new LinkedList();
arr1.forEach(function (key) {
    list1.append(key);
})
arr2.forEach(function (key) {
    list2.append(key);
})
console.log(mergeLinkedList2(list1, list2));
// 5. 合并有序链表  
// 方案一：==========就是把两个链表中所有key都拿出来放进一个数组里，然后，再对数组排序，根据数组，重新构建一个链表。

function mergeLinkedList(list1, list2) {
    // 存放两个链表key的数组
    var array = [];
    // 最终需要返回的新链表
    var list = new LinkedList();
    // 第一个链表的头节点
    var listHead1 = list1.head;
    // 第二个链表的头节点
    var listHead2 = list2.head;
    // 把第一个链表的所有key存进数组
    while (listHead1) {
        array.push(listHead1.key);
        listHead1 = listHead1.next;
    }
    // 把第二个链表的所有key存进数组
    while (listHead2) {
        array.push(listHead2.key);
        listHead2 = listHead2.next;
    }
    // 对数组进行排序
    array = array.sort(function (a, b) {
        return a - b;
    })
    // 使用数组重新构建一个链表
    array.forEach(function (key) {
        list.append(key)
    })
    return list;
}

// 方案二： 按顺序把两个链表的key插入到新链表
function mergeLinkedList1(list1, list2) {
    var list = new LinkedList();
    // 第一个链表的头节点
    var current1 = list1.head;
    // 第二个链表的头节点
    var current2 = list2.head;
    // 循环把两个链表的key按顺序插入到新链表
    while (current1 && current2) {
        if (current1.key < current2.key) {
            list.append(current1.key);
            current1 = current1.next;
        } else {
            list.append(current2.key);
            current2 = current2.next;
        }
    }
    // 找到新链表的的最后一个节点
    var current = list.head;
    while (current) {
        current = current.next;
    }
    // 循环完成后把第二个链表剩余部分插入到新链表
    if (current2) {
        while (current2) {
            list.append(current2.key);
            current2 = current2.next;
        }
    }
    // 循环完成后把第一个链表剩余部分插入到新链表
    if (current1) {
        while (current1) {
            list.append(current1.key);
            current1 = current1.next;
        }
    }
    return list;
}

// 方案三： 合并到第一个链表
function mergeLinkedList2(list1, list2) {
    debugger
    var listHead1 = list1.head;
    var listHead2 = list2.head;
    var previous = listHead1;
    // 如果第二个链表的首节点key小于第一个链表的首节点key
    // 则构造一个新节点，并把新节点插入到第一个链表头部
    if (listHead1.key > listHead2.key) {
        var node = new Node(listHead2.key);
        node.next = listHead1;
        list1.head = listHead1 = previous = node;
        listHead2 = listHead2.next;
    }
    // 循环比较两个链表的key，把第二个链表中的key插入到第一个链表合适的位置
    while (listHead1 && listHead2) {
        if (listHead2.key < listHead1.key) {
            var node = new Node(listHead2.key);
            node.next = previous.next;
            previous.next = node;
            previous = node;
            listHead2 = listHead2.next;
        } else {
            previous = listHead1;
            listHead1 = listHead1.next;
        }
    }
    // 如果第二个链表比较长，则把剩余部分插入到第一个链表
    while (listHead2) {
        var node = new Node(listHead2.key);
        if (listHead1) {
            listHead1.next = node;
            listHead1 = node;
        } else if (previous) {
            previous.next = node;
            previous = node;
        }

        listHead2 = listHead2.next;
    }

    // 修正第一个链表的长度
    list1.length = list1.length + list2.length;
    return list1;
}
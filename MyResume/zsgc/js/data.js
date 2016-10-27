/**
 * 获取所有的用户数据
 * @return {array} [description]
 */
function getListData() {
    var data = [];
    if (localStorage.hasOwnProperty('studentData')) {
        if (localStorage.studentData != "") {
            data = JSON.parse(localStorage.studentData);
        }
    }
    return data;
}

/**
 * 根据id获取数据
 * @param  {[id]} id [id]
 * @return {[object]}    [查询结果]
 */
function getDataById(id) {
    var data = getListData();
    var result = data.find(function(item) {
        if(item.id == id){
          return item;
        }
    });
    return result
}

/**
 * 保存一条记录到我的数据中
 * @param  {[Object]} obj [需要保存的数据]
 * @return {[bool]}     [true/false]
 */
function saveData(obj) {
    var data = getListData();
    data.push(obj);
    var str = JSON.stringify(data);
    localStorage.studentData = str;
    return true;
}

/**
 * 修改一条记录
 * @param  {[id]} id  [需要修改的记录的id]
 * @param  {[object]} obj [需要修改的数据]
 * @return {[bool]}     [true/false]
 */
function update(id, obj) {
    var data = getListData();
    var newData = data.map(function(item) {
        if (item.id == id) {
            item = obj;
        }
        return item;
    })
    localStorage.studentData = JSON.stringify(newData);
    return true;
}

/**
 * 根据id删除一条记录
 * @param  {[id]} id [需要删除的id]
 * @return {[bool]}    [true/false]
 */
function delData(id) {
    var data = getListData();
    // 创建一个新的数组
    // 遍历原始数据 如果不等于我要删除的id就把数据加入新数组中
    var newData = [];
    data.forEach(function(item) {
        if (item.id != id) {
            newData.push(item);
        }
    })
    localStorage.studentData = JSON.stringify(newData);
    return true;
}

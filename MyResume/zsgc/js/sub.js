var data = getListData();

var currentID = "";
var href = window.location.href;
if(href.indexOf("?")>-1){
  var arr = href.split('?');
  var arrParams =  arr[arr.length-1].split('&');
  arrParams.forEach(function(item){
    var tem = item.split('=');
    if(tem[0]=="id"){
      currentID = tem[1];
    }
  })
}

var currentData = {};
var isUpdate = false;
if(currentID!=""){
  // 初始化数据
  currentData = getDataById(currentID);
  isUpdate = true;
  document.querySelector('input[name="name"]').value = currentData.name;
  // document.querySelector('input[name="gender"]').value = currentData.gender;
  var arrGender = document.querySelectorAll('input[name="gender"]');
  for(var i=0;i<arrGender.length;i++){
    if(arrGender[i].value==currentData.gender){
      arrGender[i].checked = true;
    }
  }

  document.querySelector('input[name="age"]').value = currentData.age;
  document.querySelector('textarea[name="hobby"]').value = currentData.hobby;
}

function doSbmit(event) {
    var name = getValueByInputName('name');
    var age = getValueByInputName('age');
    var gender = '';//getValueByInputName('gender');
    /**
     * 获取所有的性别选择框
     */
    var arrGender = document.querySelectorAll('input[name="gender"]');
    for(var i=0;i<arrGender.length;i++){
      if(arrGender[i].checked){
        gender = arrGender[i].value;
      }
    }
    //var hobby = getValueByInputName('hobby');
    var hobby = document.querySelector('textarea[name="hobby"]').value;
    var student = {};
    student.id = Date.now();
    student.name = name;
    student.age = age;
    student.gender = gender;
    student.hobby = hobby;
    if(isUpdate){
        update(currentID,student);
    }
    else{
        saveData(student);
    }

    // 页面进行跳转 跳转到href属性指定的值
    window.location.href = 'list.html';
}

/**
 * 根据表单元素的name获取value值
 * @param  {[type]} iName [表单元素的name值]
 * @return {[type]}       [description]
 */
function getValueByInputName(iName) {
    var result = "";
    result = document.querySelector('input[name="' + iName + '"]').value;
    return result;
}

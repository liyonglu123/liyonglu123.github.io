var data = getListData();

document.querySelector('#listBody').innerHTML = template('tbody', {
    list: data
});

function delFun(id){
  /**
   * confirm 弹出一个询问提示框
   * 点击确认按钮 返回true
   * 否则返回false值
   */
  if(confirm('是否确认删除?')){
      // alert('删除成功');
      if(delData(id)){
        window.location.reload();
      }
  }

}

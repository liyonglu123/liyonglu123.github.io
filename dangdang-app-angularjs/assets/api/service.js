app.factory('commonService',['$http',function($http){
  var service ={};
  // 根据分类信息获取数据
  service.getData = function(type,callBack){
    $http({
      // /dangdang-app-angularjs/index.html 绝对路径
      url:'/dangdang-app-angularjs/data/book_'+type+'.json',
      method:"get"
    })
    .then(function(res){
      // console.log('获取数据成功');
      callBack(res);
    },function(err){
      callBack(err);
    });
  };
  return service;
}]);

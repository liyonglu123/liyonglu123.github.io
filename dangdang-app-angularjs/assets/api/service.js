app.factory('commonService',['$http',function($http){
  var service ={};
  service.getData = function(type,callBack){
    $http({
      url:'/dangdang-app-angularjs/data/book_'+type+'.json',
      method:"get"
    })
    .then(function(res){
      console.log('获取数据成功');
      callBack(res);
    },function(err){
      callBack(err);
    });
  };
  return service;
}]);

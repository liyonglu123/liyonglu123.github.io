app.controller('bookListController',['$scope','commonService','$routeParmas',function($scope,c_service,$routeParmas){
  // 获取数据
  $scope.bookData =[];
console.dir($routeParmas);
  c_service.getData('ertong',function(res){
    console.log('获取数据成功');
    console.dir(res);
    $scope.bookData = res.data;
  });
}]);

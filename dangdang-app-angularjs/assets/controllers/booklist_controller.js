app.controller('bookListController',['$scope','commonService','$routeParmas',function($scope,c_service,$routeParmas){
  // 获取数据
  $scope.bookData =[];
console.dir($routeParmas);
  c_service.getData($routeParmas.id,function(res){
    console.log('获取数据成功');
    console.dir(res.data);
    $scope.bookData = res.data;
  });
}]);

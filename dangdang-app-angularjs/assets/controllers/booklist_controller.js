app.controller('bookListController',['$scope','commonService','$routeParams',function($scope,c_service,$routeParams){
  // 获取数据
  $scope.bookData =[];
console.dir($routeParams);
  c_service.getData($routeParams.id,function(res){
    console.log('获取数据成功');
    console.dir(res.data);
    $scope.bookData = res.data;
  });
}]);

app.controller('bookListController',['$scope','commonService',function($scope,c_service){
  // 获取数据
  $scope.bookData =[];

  c_service.getData('ertong',function(res){
    console.log('获取数据成功');
    console.dir(res);
    $scope.bookData = res.data.data;
  });
}]);

app.controller('mainController',['$scope','commonService',function($scope,c_service){
  c_service.getData('ertong',function(res){
    // console.dir(res);
  });
  // 设置底部导航的选择效果
  $scope.selectedIndex = 0;
  $scope.linkTo = function(index){
    $scope.selectedIndex = index;
  };
}]);

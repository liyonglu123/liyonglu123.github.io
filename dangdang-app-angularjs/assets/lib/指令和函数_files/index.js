var app = angular.module('app',[]);
app.controller('mainController',['$scope',function($scope){
  $scope.txtIsShow = true;
  $scope.changeShow =function(){
    $scope.txtIsShow = !$scope.txtIsShow;
  };
  $scope.keyUpHandle =function(){
    console.dir(event);
    if (event.keyCode==65||event.keyCode==97) {
      $scope.txtInput= this.txtInput.replace('a','*').replace('A','*');
    }
    console.dir(this);
  };
}]);

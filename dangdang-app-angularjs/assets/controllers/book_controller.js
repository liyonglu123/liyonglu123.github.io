app.controller('bookController',['$scope',function($scope){
  $scope.bookTypes = [
    {id:'ertong',name:'儿童',img:'http://img3x9.ddimg.cn/58/23/24026269-1_l_11.jpg',description:'当当儿童图书热搜榜'},
    {id:'lishi',name:'历史',img:'http://img3x9.ddimg.cn/58/23/24026269-1_l_11.jpg',description:'当当历史图书热搜榜'},
    {id:'dongman',name:'动漫',img:'http://img3x9.ddimg.cn/58/23/24026269-1_l_11.jpg',description:'当当动漫图书热搜榜'},
    {id:'qingchunwenxue',name:'青春文学',img:'http://img3x9.ddimg.cn/58/23/24026269-1_l_11.jpg',description:'当当青春文学图书热搜榜'},
  ];
}]);

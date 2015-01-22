angular.module('source')

.controller('homeController', function($rootScope, $scope, auth, API) {
	 $rootScope.auth = auth;

	 $scope.getFeed = function() {

	  // $scope.data = myService.getData($routeParams.dataID);


	  $scope.data = API.getAll()
	  	.success(function (data, status, headers, config) {
			 $scope.articles = [];

             for (var i = 0; i < data.length; i++) {
                if (data[i].public == false) {
                    $scope.articles.push(data[i]);
                }
            };
            console.log($scope.articles);

	  	}).error(function (data, status, headers, config) {
           
            console.log('someting wwetn wrong')
        });




		 

	 };



});

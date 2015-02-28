angular.module('source')

.controller('homeController', function($rootScope, $scope, auth, API) {
	 $rootScope.auth = auth;

	 $scope.getHomeFeed = function() {

	 var id  = window.localStorage.SourceID;


	 $scope.data = API.getHomeFeed(id)
	  	.success(function (data, status, headers, config) {
			 $scope.articles = [];

            for (var i = 0; i < data.length; i++) {
                if (data[i].public == true) {
                    $scope.articles.push(data[i]);
                }
            };


	  	}).error(function (data, status, headers, config) {
            console.log('someting went wrong')
        });

	 };



});

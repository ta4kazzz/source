angular.module('source')

.controller('exploreController', function($scope, API, auth, $rootScope) {

	 $rootScope.auth = auth;

	 $scope.getAllArticles = function() {
		 $scope.data = API.getArticles()
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





 	 $scope.getAllUsers = function() {
		 $scope.data = API.getUsers()
		  	.success(function (data, status, headers, config) {
				 $scope.users = [];

	            for (var i = 0; i < data.length; i++) {
	                $scope.users.push(data[i]);
	            };


		  	}).error(function (data, status, headers, config) {
	            console.log('someting went wrong')
	        });
	 };






});
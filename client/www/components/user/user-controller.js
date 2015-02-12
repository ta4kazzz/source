angular.module('source')

.controller('userController', function($scope, $rootScope, API, $stateParams) {


	$scope.getUser = function() {
 	// code goes here that gets the user information 

	var id = $stateParams.userID;
	console.log(id);

 	API.getUser(id)
 		.success(function (user, status, headers, config) {
 			$scope.username = user.username;
 			$scope.gravatarURL = user.gravatarURL;
 		})
 		.error(function (user, status, headers, config) {
 			console.log("Something went wrong")
 		});


 	};

  $scope.getUserFeed = function() {

	 var user_id 		= $stateParams.userID;

   	$scope.data = API.getUsersArticle(user_id)
   		.success(function (data, status, headers, config) {
        $scope.articles = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].public == true) {
                $scope.articles.push(data[i]);
            }
        };


   		})
   		.error(function (article, status, headers, config) {
   			console.log("Something went wrong")
   		});



  };




});
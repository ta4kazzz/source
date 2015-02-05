angular.module('source')

.controller('profileController', function($rootScope, $scope, auth, API) {
  $scope.auth = auth;
	


  $scope.getProfile = function() {

  	var id  = window.localStorage.SourceID;

   	API.getUser(id)
   		.success(function (user, status, headers, config) {
  			console.log("Your profile successfully retreived")
  			// console.log(user);

   		})
   		.error(function (user, status, headers, config) {
   			console.log("Your profile was not retreived")

   		});

  };







  $rootScope.getProfileFeed = function() {

	var user_id 		= window.localStorage.SourceUserID;

 	API.getUsersArticle(user_id)
 		.success(function (article, status, headers, config) {
			console.log("Something went right")
 		})
 		.error(function (article, status, headers, config) {
 			console.log("Something went wrong")
 		});



  };
  	

});
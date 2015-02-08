angular.module('source')

.controller('profileController', function($rootScope, $scope, auth, API) {
  $scope.auth = auth;
	


  $scope.getProfile = function() {

  	var id  = window.localStorage.SourceID;

   	API.getUser(id)
   		.success(function (user, status, headers, config) {
  			console.log("Your profile successfully retreived")
  			$scope.username = user.username;
        $scope.followsNum = user.counts.follows;
        $scope.followersNum = user.counts.followed_by;
   		})
   		.error(function (user, status, headers, config) {
   			console.log("Your profile was not retreived")

   		});

  };


  $scope.getProfileFeed = function() {

	 var user_id 		= window.localStorage.SourceID;

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
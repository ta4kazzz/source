angular.module('source')

.controller('profile-followers-controller', function($scope, API) {

  $scope.getFollowers = function() {
  	
	 var id 		= window.localStorage.SourceID;

   	$scope.users = API.getFollowers(id)
   		.success(function (data, status, headers, config) {
        $scope.users = [];

        for (var i = 0; i < data.length; i++) {
    	    $scope.users.push(data[i]);
        };


   		})
   		.error(function (users, status, headers, config) {
   			console.log("Something went wrong")
   		});

  };


});
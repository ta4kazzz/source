angular.module('source')

.controller('user-followers-controller', function($scope, $rootScope, auth, API,  $stateParams) {

  $scope.getFollowers = function() {

	 var id 		= $stateParams.userID;

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
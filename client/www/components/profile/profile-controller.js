angular.module('source')

.controller('profileController', function($rootScope, $scope, auth, API) {
  $scope.auth = auth;
	

  $rootScope.getProfileFeed = function() {

	var userID 		= window.localStorage.SourceUserID;



  };
  	

});
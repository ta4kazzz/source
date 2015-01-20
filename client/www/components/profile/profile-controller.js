angular.module('source')

.controller('profileController', function($scope, $rootScope, auth) {
	
	function UserInfoCtrl($scope, auth) {
	  $scope.auth = auth;
	};
	
});
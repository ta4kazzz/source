angular.module('source')

.controller('homeController', function($rootScope, $scope, auth) {
	 $rootScope.auth = auth;
});
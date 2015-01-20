angular.module('source')

.controller('menuController', function($scope, $rootScope, auth) {
	$scope.auth = auth;
});
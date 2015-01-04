angular.module('source')

.controller('menuController', function($scope) {

	$scope.auth = Auth;
	
    $scope.logout = function () {
        Auth.$unauth();
    };


});
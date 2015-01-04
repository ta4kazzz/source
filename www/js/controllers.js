angular.module('source.controllers', [])

.controller('AppCtrl', function($scope, Auth) {

	// Dont Repeat Yourself - this is already in login-controller
    $scope.logout = function () {
        Auth.$unauth();
    };




});

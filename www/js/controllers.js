angular.module('source.controllers', [])

.controller('AppCtrl', function($scope, Auth) {

    $scope.logout = function () {
        Auth.$unauth();
    };




});

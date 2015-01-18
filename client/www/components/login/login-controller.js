angular.module('source')

.controller('loginController', function($scope, $rootScope, API, $window) {


    $scope.showLoginForm = true;

	$scope.user = {
		username: "",
		password: ""
	};


    $scope.validateUser = function () {
        var username = this.user.username;
        var password = this.user.password;


        $rootScope.setUsername(username);
        $rootScope.setPassword(password);

        $window.location.href = ('#/app/home');
    }


});
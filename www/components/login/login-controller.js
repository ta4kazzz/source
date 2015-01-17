angular.module('source')

.controller('loginController', function($scope, $rootScope, API, $window) {


     $scope.showLoginForm = true;

 	// if the user is already logged in, take him to his bucketlist
    if ($rootScope.isSessionActive()) {
        $window.location.href = ('#/app/home');
    }


	$scope.user = {
		email: "",
		password: ""
	};

	// We know this works

    $scope.validateUser = function () {
        var email = this.user.email;
        var password = this.user.password;

        if(!email || !password) {
        	$rootScope.notify("Please enter valid credentials");
        	return false;
        }


        // $rootScope.show('Please wait.. Authenticating');

        API.login({
            email: email,
            password: password
        }).success(function (data) {
            $rootScope.setToken(email); // create a session kind of thing on the client side
            $rootScope.hide();
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            $rootScope.hide();
            $rootScope.notify("Invalid Username or password");
        });
    }








});
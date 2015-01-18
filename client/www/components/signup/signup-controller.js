angular.module('source')

.controller('signupController', function($scope, $rootScope, API, $window) {
	
	$scope.user = {
        email: "",
        password: "",
        username: ""
    };
 
    $scope.createUser = function () {
    	var email = this.user.email;
        var password = this.user.password;
        var username = this.user.username;

        if(!email || !password || !username) {
        	$rootScope.notify("Please enter valid data");
        	return false;
        }

        // $rootScope.show('Please wait.. Registering');

        API.signup({
            email: email,
            password: password,
            username: username
        }).success(function (data) {
            $rootScope.setUsername(username);
            $rootScope.setPassword(password);
            $window.location.href = ('#/app/home');
        }).error(function (error) {
            $rootScope.hide();
        	if(error.error && error.error.code == 11000)
        	{
        		$rootScope.notify("A user with this email already exists");
        	}
        	else
        	{
        		$rootScope.notify("Oops something went wrong, Please try again!");
        	}
            
        });
    }

});
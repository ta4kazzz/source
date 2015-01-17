angular.module('source')

.controller('signupController', function($scope, $rootScope, API, $window) {
	
	$scope.user = {
        email: "",
        password: "",
        name: ""
    };
 
    $scope.createUser = function () {
    	var email = this.user.email;
        var password = this.user.password;
        var uName = this.user.name;

        if(!email || !password || !uName) {
        	$rootScope.notify("Please enter valid data");
        	return false;
        }

        // $rootScope.show('Please wait.. Registering');

        API.signup({
            email: email,
            password: password,
            uName: uName
        }).success(function (data) {
            $rootScope.setToken(email); // create a session kind of thing on the client side $rootScope.hide();
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
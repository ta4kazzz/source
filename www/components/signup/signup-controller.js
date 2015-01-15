angular.module('source')

.controller('signupController', function($scope, $rootScope, API, $window) {

	$scope.user = {
		email: "",
		password: ""
	};

	// We know this works

	$rootScope.createUser = function () {
		var email = this.user.email;
		var password = this.user.password;

				
		API.signup({
			email: email,
			password: password
		}).success(function (data) {
			$rootScope.setToken(email);
			console.log("You creted a User");
			$window.location.href = ('#/app/home');
		}).error(function (error) {
			console.log("Something went wrong")
		});

		console.log(email + password);
	};

});
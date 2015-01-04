angular.module('source')

.controller('loginController', function($scope, Auth) {

	$scope.auth = Auth;
	// This should return null if the user is not logged in
	console.log(Auth.$getAuth());


	$scope.showLoginForm = false;

	// $scope.user = fireBaseData.ref().getAuth();
	$scope.user = Auth.$getAuth();
	if (!$scope.user) {
		$scope.showLoginForm = true;
	}

    //Login method
    $scope.login = function (em, pwd) {
        Auth.$authWithPassword({
            email    : em,
            password : pwd
        }, function(error, authData) {
            if (error === null) {
                console.log("User ID: " + authData.uid + ", Provider: " + authData.provider);
                $scope.user = Auth.$getAuth();
                $scope.showLoginForm = false;
                $scope.$apply();
            } else {
                console.log("Error authenticating user:", error);
            }
        });
    };

    // Logout method
    // Dont Repeat Yourself - this is also in app.js
    $scope.logout = function () {
        Auth.$unauth();
        $scope.showLoginForm = true;
    };


});
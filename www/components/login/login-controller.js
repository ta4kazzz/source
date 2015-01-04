angular.module('source')

.controller('loginController', function($scope, $rootScope, $window) {

    // DRY > app.js
    var rootRef = new Firebase($rootScope.baseUrl);

    $scope.user = rootRef.getAuth();
    // This should return null if the user is not logged in
    console.log($scope.user)
    // If the user is not logged in show the login form
    if (!$scope.user) {
     $scope.showLoginForm = true;
    }



    // Login
    $scope.login = function(em, pwd) {
        rootRef.authWithPassword({
            email      : em,
            password   : pwd
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed", error);
            } else {
                console.log("Authentication is a go", authData);
                $window.location.href = '#/app/home';
            }
        });
    };


    // Logout Function
    $scope.logout = function() {
      rootRef.unauth();
      $scope.showLoginForm = true;
    };



});
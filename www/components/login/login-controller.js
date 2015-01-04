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


    $scope.errorMessage;


    $scope.login = function(em, pwd) {
        rootRef.authWithPassword({
            email      : em,
            password   : pwd
        }, function(error, authData) {
            if (error) { 
                switch (error.code) {
                  case "INVALID_EMAIL":
                      $scope.errorMessage = "Invalid Email";
                      break;
                  case "INVALID_PASSWORD":
                      $scope.errorMessage = "Password is incorrect";
                      break;
                  case "INVALID_USER":
                      $scope.errorMessage = "Account does not exist";
                      break;
                  default:
                      $scope.errorMessage = "General Error";
                }
            } else {
              console.log("Authentication successfull, You're in!", authData);
              $window.location.href = '#/app/home';
            }
        });
    };








});
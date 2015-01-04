angular.module('source')

.controller('loginController', function($scope, $rootScope) {

    // DRY > app.js
    var rootRef = new Firebase($rootScope.baseUrl);

    $scope.user = rootRef.getAuth();
    // This should return null if the user is not logged in
    console.log($scope.user)
    // If the user is not logged in show the login form
    if (!$scope.user) {
     $scope.showLoginForm = true;
    }



});
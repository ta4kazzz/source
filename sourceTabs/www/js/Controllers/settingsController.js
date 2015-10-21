angular.module('starter.controllers')
.controller('SettingsController', function ($scope, store, $state, API) {
    $scope.logout = function () {
        API.logoutUser().success(function (response) {
            $state.go('login');
        }).error(function (a, b, c, d) {
            console.log('Error on logout' + d);
        });
    };

    // On before you ender the pag run this function
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getProfile();
    });

    $scope.editProfileForm = {
        email: "",
        username: "",
        description: ""
    };

    $scope.editUser = function () {

        // ID of the person using
        var userID = window.localStorage.SourceID;

        var email = $scope.editProfileForm.email
        var username = $scope.editProfileForm.username
        var description = $scope.editProfileForm.description

        var user = {
            email: email,
            username: username,
            userID: userID,
            description: description
        };


        API.putUser(user)
            .success(function (user, status, headers, config) {
                $state.go('tabs.profile');
            })
            .error(function (user, status, headers, config) {
                console.log("Your profile was not retreived")

            });


    };

    $scope.getProfile = function () {

        var id = window.localStorage.SourceID;

        API.getUser(id)
            .success(function (user, status, headers, config) {
                console.log("Your profile successfully retreived")

                $scope.username = user.username;
                $scope.email = user.email;
                $scope.description = user.description;
                console.log(user.description);
                console.log($scope.description);

                // Adds them to the edit profile form
                $scope.editProfileForm.username = user.username;
                $scope.editProfileForm.email = user.email;
                $scope.editProfileForm.description = user.description;


            })
            .error(function (user, status, headers, config) {
                console.log("Your profile was not retreived")

            });
    };
});

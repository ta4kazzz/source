angular.module('starter.controllers')
.controller('UserFollowersController', function ($scope, $rootScope, API, $stateParams) {

    // On before you ender the pag run this function
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getFollowers();
    });

    $scope.getFollowers = function () {

        var id = $stateParams.userID;
        console.log("whats the " + id);

        $scope.users = API.getFollowers(id)
            .success(function (data, status, headers, config) {
                $scope.users = [];

                for (var i = 0; i < data.length; i++) {
                    $scope.users.push(data[i]);
                };


            })
            .error(function (users, status, headers, config) {
                console.log("Something went wrong")
            });

    };


});

angular.module('starter.controllers')
.controller('ProfileFollowersController', function ($scope, API) {

        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.getFollowers();
        });

        $scope.getFollowers = function () {

            var id = window.localStorage.SourceID;

            $scope.users = API.getFollowers(id)
                .success(function (data, status, headers, config) {
                    $scope.users = [];

                    for (var i = 0; i < data.length; i++) {
                        if (id !== data[i]._id) {
                            $scope.users.push(data[i]);
                        }
                    };
                })
                .error(function (users, status, headers, config) {
                    console.log("Something went wrong");
                });
        };

    });

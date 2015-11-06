angular.module('starter.controllers')
.controller('ProfileBoardsController', function ($scope, $state, $rootScope, API) {
    var id = window.localStorage.SourceID;
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getBoards();
    });

    $scope.new = function() {
        $state.go('tabs.addBoard');
    };

    $scope.getBoards = function () {
        $scope.boards = API.getBoards(id)
            .success(function (data, status, headers, config) {
                if (data.message) {
                    console.log(data);
                } else {
                    $scope.boards = data;
                    console.log(data.length);
                    $scope.profileBoardNumber = data.length;
                }
            })
            .error(function (users, status, headers, config) {
                console.log("Something went wrong");
            });
    };
});

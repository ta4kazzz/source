angular.module('starter.controllers')
.controller('ProfileBoardsDetailsController', function ($scope, $state, $rootScope, API) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getBoard();
    });

    $scope.getBoard = function () {
        $scope.boards = API.getDetailBoard($state.params.id)
            .success(function (data, status, headers, config) {
                if (data.message) {
                    console.log(data);
                } else {
                    $scope.board = data;
                }
            })
            .error(function (users, status, headers, config) {
                console.log("Something went wrong");
            });
    };
});

angular.module('starter.controllers')
.controller('AddBoardController', function ($scope, $rootScope, $window, API, store, $state) {
    $scope.board = {};

    // Validation method
    $scope.postBoardForm = function () {
        if ($scope.addNewForm.$valid) {
            $scope.postBoard();
        } else {
            $scope.errorMessage = $scope.formatAlertMessage($scope.addNewForm.$error.required);
        }
    };

    // ==============================================
    // Post Board 
    // ==============================================
    $scope.postBoard = function () {
        var userID = window.localStorage.SourceID;
        // Construct Article Object
        var board = {
            name: $scope.board.name,
            userID: userID,
        };

        // API that posts the articles
        API.postBoard(userID, board)
            .success(function (article, status, headers, config) {
                console.log("Board packet successfuly sent");
                $state.go('tabs.profileBoards');
            })
            .error(function (article, status, headers, config) {
                console.log("Error when posting the Board packet");
            });
    };

    $scope.formatAlertMessage = function (errors) {
        var messeage = 'These fields are required:\n';
        angular.forEach(errors, function (value, key) {
            messeage = messeage + value.$name + ",";
            value.$dirty = true;
        });
        return messeage;
    };

});

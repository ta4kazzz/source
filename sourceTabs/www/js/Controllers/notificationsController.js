angular.module('starter.controllers')
.controller('NotificationsController', function ($scope, store, $state, API) {
    // On before you ender the pag run this function
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getNotifications();
    });

    $scope.getNotifications = function () {
        var userID = window.localStorage.SourceID;

        $scope.notifications = API.getNotifications(userID)
            .success(function (data, status, headers, config) {
                $scope.notifications = [];
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    $scope.notifications.push(data[i]);
                };

            })
            .error(function (users, status, headers, config) {
                console.log("notify me cause its broken")
            });

    };
});

angular.module('starter.controllers')
.controller('LikersController', function ($scope, API, $stateParams) {

    // On before you ender the pag run this function
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getLiked();
    });


    $scope.getLiked = function () {

        // this needs to be the article
        var id = $stateParams.articleID;

        $scope.users = API.getLikers(id)
            .success(function (data, status, headers, config) {

                console.log(data);

                $scope.users = [];

                for (var i = 0; i < data.length; i++) {
                    $scope.users.push(data[i]);
                };

                $scope.savedArticlesNumber = data.length;


            })
            .error(function (users, status, headers, config) {
                console.log("Something went wrong")
            });

    };

});


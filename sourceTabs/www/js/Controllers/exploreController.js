angular.module('starter.controllers')
.controller('ExploreController', function ($scope, API, auth, $rootScope) {
        // Auth Init - Do I need this here?
        $rootScope.auth = auth;

        // Tab Logic
        $scope.tab = 1;

        $scope.setTab = function (newTab) {
            $scope.tab = newTab;
        };

        $scope.isSet = function (tabNum) {
            return $scope.tab === tabNum;
        };


        // On before you ender the pag run this function
        $scope.$on('$ionicView.beforeEnter', function () {
            $scope.getAllArticles();
            $scope.getAllUsers();
            $scope.getTopLiked();
        });


        $scope.getAllArticles = function () {
            $scope.data = API.getArticles()
                .success(function (data, status, headers, config) {
                    $scope.articles = [];

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].public == true) {
                            $scope.articles.push(data[i]);
                        }
                    };

                }).error(function (data, status, headers, config) {
                    console.log('someting went wrong')
                });
        };


        $scope.getAllUsers = function () {
            $scope.data = API.getUsers()
                .success(function (data, status, headers, config) {
                    $scope.users = [];
                    console.log("Successfully getting all the users");
                    for (var i = 0; i < data.length; i++) {
                        $scope.users.push(data[i]);
                    };


                }).error(function (data, status, headers, config) {
                    console.log('someting went wrong')
                });
        };


        $scope.getTopLiked = function () {

            console.log("Getting Top Liked Trigger")

            $scope.data = API.getTopArticles()
                .success(function (data, status, headers, config) {

                    $scope.topArticles = [];

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].public == true) {
                            $scope.topArticles.push(data[i]);
                        }
                    };


                    console.log("Got all the top articles")


                }).error(function (data, status, headers, config) {
                    console.log('someting went wrong')
                });


        };

    });

angular.module('starter.controllers')
.controller('ExploreController', function ($scope, API,  $rootScope) {
    $scope.pageNumber = 1;
    $scope.itemsPerPage = 10;
    $scope.noMoreItemsAvailable = false;
    $scope.articles = [];
    // Tab Logic
    $scope.tab = 1;

    $scope.setTab = function (newTab) {
        $scope.tab = newTab;
    };

    $scope.isSet = function (tabNum) {
        return $scope.tab === tabNum;
    };

    $scope.loadMore = function () {
        var packageToSend = {
            pageNumber: $scope.pageNumber,
            itemsPerPage: $scope.itemsPerPage
        };

        API.getArticlesPaging(packageToSend)
                .success(function (data) {
                    if (data.length > 0) {
                        //$scope.articles = [];

                        for (var i = 0; i < data.length; i++) {
                            if (data[i].public == true) {
                                $scope.articles.push(data[i]);
                            }
                        }
                    }

                    if (data.length <= 0 || data.length != $scope.itemsPerPage) {
                        $scope.noMoreItemsAvailable = true;
                    }

                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
        .error(function (data, status, headers, config) {
            console.log("Error when getting home feed");
        })
       .finally(function () {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
       });

        $scope.pageNumber++;
    };

    $scope.doRefresh = function () {
        $scope.articles = [];
        $scope.pageNumber = 1;
        $scope.itemsPerPage = 10;
        $scope.loadMore();
    };

    $scope.getAllArticles = function () {
        $scope.data = API.getArticles()
            .success(function (data, status, headers, config) {
                $scope.articles = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].public == true) {
                        $scope.articles.push(data[i]);
                    }
                }
            }).error(function (data, status, headers, config) {
                console.log('someting went wrong');
            });
    };

    $scope.getAllUsers = function () {
        $scope.data = API.getUsers()
            .success(function (data, status, headers, config) {
                $scope.users = [];
                //console.log("Successfully getting all the users");
                for (var i = 0; i < data.length; i++) {
                    $scope.users.push(data[i]);
                };


            }).error(function (data, status, headers, config) {
                console.log('someting went wrong');
            });
    };


    $scope.getTopLiked = function () {
        console.log("Getting Top Liked Trigger");

        $scope.data = API.getTopArticles()
            .success(function (data, status, headers, config) {
                $scope.topArticles = [];

                for (var i = 0; i < data.length; i++) {
                    if (data[i].public == true) {
                        $scope.topArticles.push(data[i]);
                    }
                };

            }).error(function (data, status, headers, config) {
                console.log('someting went wrong');
            });
    };
});

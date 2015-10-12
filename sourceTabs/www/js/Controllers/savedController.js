angular.module('starter.controllers')
.controller('SavedController', function ($scope, API) {
    // On before you ender the pag run this function
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getSaved();
    });

    $scope.getSaved = function () {

        var id = window.localStorage.SourceID;


        $scope.users = API.getSaved(id)
            .success(function (data, status, headers, config) {
                $scope.articles = [];

                for (var i = 0; i < data.length; i++) {
                    $scope.articles.push(data[i]);
                };

                $scope.savedArticlesNumber = data.length;


            })
            .error(function (users, status, headers, config) {
                console.log("Something went wrong")
            });

    };

    $scope.deleteSaved = function (articleID) {


        var userID = window.localStorage.SourceID;
        var articleID = articleID;

        var savedArticle = {
            articleID: articleID,
            userID: userID
        };

        console.log(savedArticle);


        API.deleteSaved(savedArticle)
            .success(function (article, status, headers, config) {
                console.log("article delete")
                $scope.getSaved();
            })
            .error(function (article, status, headers, config) {
                console.log("Something went wrong")
            });

    };
});

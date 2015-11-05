angular.module('starter.controllers')
.controller('ProfileCtrl', function ($rootScope, $scope, API, $stateParams) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getProfile();
        $scope.getProfileFeed();
    });

    $scope.getProfile = function () {
        var id = window.localStorage.SourceID;

        API.getUser(id)
            .success(function (user, status, headers, config) {
                console.log("Your profile successfully retreived");
                $scope.username = user.username;
                $scope.description = user.description;
                $scope.gravatarURL = user.gravatarURL;
                // $scope.followsNum = user.counts.follows;
                // $scope.followersNum = user.counts.followed_by;
                $scope.getFollowers();
                $scope.getFollows();
                $scope.getBoards();
            })
            .error(function (user, status, headers, config) {
                console.log("Your profile was not retreived");
            });

        $scope.getFollowers = function () {
            $scope.users = API.getFollowers(id)
                .success(function (data, status, headers, config) {
                    $scope.users = [];
                    $scope.profileFollowerNumber = data.length - 1;
                })
                .error(function (users, status, headers, config) {
                    console.log("Something went wrong");
                });
        };

        $scope.getFollows = function () {
            $scope.users = API.getFollows(id)
                .success(function (data, status, headers, config) {
                    $scope.users = [];
                    console.log(data.length);
                    $scope.profileFollowingNumber = data.length - 1;
                })
                .error(function (users, status, headers, config) {
                    console.log("Something went wrong")
                });
        };

        $scope.getBoards = function () {
            $scope.boards = API.getBoards(id)
                .success(function (data, status, headers, config) {
                    $scope.boards = [];
                    console.log(data.length);
                    $scope.profileBoardNumber = data.length;
                })
                .error(function (users, status, headers, config) {
                    console.log("Something went wrong");
                });
        };
    };

    $scope.getProfileFeed = function () {

        var userID = window.localStorage.SourceID;

        $scope.data = API.getUsersArticles(userID)
            .success(function (data, status, headers, config) {
                $scope.articles = [];

                $scope.profileArticleNumber = data.length;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].public == true) {
                        $scope.articles.push(data[i]);
                    }
                };


            })
            .error(function (article, status, headers, config) {
                console.log("Something went wrong")
            });


    };
});

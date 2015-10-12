angular.module('starter.controllers')
.controller('UserController', function($scope, $rootScope, API, $stateParams) {

        $scope.$on('$ionicView.beforeEnter', function() {
            $scope.getUser();
            $scope.getUserFeed();
        });


        // if the user follows this user then showme = true
        $scope.user_id = $stateParams.userID;


        $scope.followUser = function() {
            // the ID is the person who is logged in and doing the adding action
            var id = window.localStorage.SourceID;
            // The user is who we want to "follow" - or add to alices's list
            var user = {
                _id: $stateParams.userID
            };

            API.followUser(id, user)
                .success(function(user, status, headers, config) {
                    // turn the button to unfolow
                    console.log("sent")
                    console.log(user);
                    $scope.getUser();
                })
                .error(function(user, status, headers, config) {
                    console.log("Something went wrong")
                });
        };


        $scope.unfollowUser = function() {

            // the ID is the person who is logged in and doing the adding action
            var id = window.localStorage.SourceID;

            // The user is who we want to "follow" - or add to pat's list
            var user = {
                _id: $stateParams.userID
            };

            API.unfollowUser(id, user)
                .success(function(user, status, headers, config) {
                    // turn the button to unfolow
                    console.log("sent")
                    console.log(user);
                    $scope.getUser();
                })
                .error(function(user, status, headers, config) {
                    console.log("Something went wrong")
                });

        };


        $scope.getUser = function() {


            var myid = window.localStorage.SourceID;
            var id = $stateParams.userID;

            API.getUser(myid)
                .success(function(user, status, headers, config) {

                    var myFollows = user.follows;
                    var result = myFollows.indexOf(id);

                    if (result >= 0) {
                        console.log("You are following this user");
                        $scope.relationship = 'following';
                    } else {
                        console.log("You are not following this user");
                        $scope.relationship = 'notFollowing';
                    }

                })
                .error(function(user, status, headers, config) {
                    console.log("Something went wrong")
                });


            API.getUser(id)
                .success(function(user, status, headers, config) {
                    $scope.username = user.username;
                    $scope.gravatarURL = user.gravatarURL;
                    $scope.getFollowers();
                    $scope.getFollows();
                })
                .error(function(user, status, headers, config) {
                    console.log("Something went wrong")
                });


            // GET FOLLOWERS
            $scope.getFollowers = function() {
                // var id     = $stateParams.userID;
                $scope.users = API.getFollowers(id)
                    .success(function(data, status, headers, config) {
                        $scope.users = [];
                        $scope.followerNumber = data.length;
                        // if our name is in the list, then turn that thing to true
                        // turn that variable true/false
                    })
                    .error(function(users, status, headers, config) {
                        console.log("Something went wrong")
                    });
            };


// GET FOLLOWS
            $scope.getFollows = function() {
                var id = $stateParams.userID;
                $scope.users = API.getFollows(id)
                    .success(function(data, status, headers, config) {
                        $scope.users = [];
                        console.log(data.length);
                        $scope.followingNumber = data.length;
                    })
                    .error(function(users, status, headers, config) {
                        console.log("Something went wrong")
                    });

            };
        };


        $scope.getUserFeed = function() {

            var user_id = $stateParams.userID;

            $scope.data = API.getUsersArticles(user_id)
                .success(function(data, status, headers, config) {
                    $scope.articles = [];

                    $scope.articleNumber = data.length;

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].public == true) {
                            $scope.articles.push(data[i]);
                        }
                    };

                })
                .error(function(article, status, headers, config) {
                    console.log("Something went wrong")
                });

        };


    });

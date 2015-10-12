angular.module('starter.controllers')
.controller('AddController', function($scope, $rootScope, $window, API, store, $state, auth, $timeout) {


// Allows us to post gravatar in preview
        $rootScope.auth = auth;

        // SETUP
        $scope.article = {
            url: "",
            summary: ""
        };


        $scope.doRefresh = function() {
            $timeout(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.refreshComplete');
            }, 1250);
        };


        // Add Article ==============================================
        // This function takes the form data, posts an article and then retreives the full article content
        $scope.addArticle = function() {
            var url = $scope.article.url;
            var summary = $scope.article.summary;
            var userID = window.localStorage.SourceID;

            var id = userID;

            // Convert long url into short url
            var parser = document.createElement('a');
            parser.href = url;
            var shortUrl = parser.hostname;

            // Gets User info so we can attach that to article
            API.getUser(id)
                .success(function(user, status, headers, config) {
                    console.log("You got the user");
                    console.log(user);
                    $scope.username = user.username;
                    $scope.gravatarURL = user.gravatarURL;
                    postUser();

                })
                .error(function(article, status, headers, config) {
                    console.log("error when getting the user")
                });


            function postUser() {
                // Construct Article Object
                var article = {
                    url: url,
                    summary: summary,
                    created: Date.now(),
                    userID: userID,
                    username: $scope.username,
                    gravatarURL: $scope.gravatarURL,
                    shortUrl: shortUrl
                };


                // API that posts the articles
                API.postArticle(article)
                    .success(function(article, status, headers, config) {
                        console.log("Article packet successfuly sent");
                        var id = article._id
                        $scope.getArticle(id);
                        window.localStorage['ActiveArticle'] = id;
                        $scope.getPreview()
                        // $state.go('preview');
                        $scope.showPublish = true;
                        // $scope.publishArticle();
                    })
                    .error(function(article, status, headers, config) {
                        console.log("Error when posting the article packet")
                    });
            }

        };


        $scope.getPreview = function() {

            var id = window.localStorage.ActiveArticle;

            $scope.getArticle(id);

        };


        $scope.getArticle = function(id) {

            // API that gets the full Article
            API.getArticle(id)
                .success(function(article, status, headers, config) {
                    $scope.article = article;
                    $scope.article.title = article.title;
                    $scope.article.time = article.created;
                    $scope.article.imageUrl = article.imageUrl;
                    $scope.article.summary = article.summary;
                    $scope.article._id = article._id;
                    console.log("success!")
                })
                .error(function(article, status, headers, config) {
                    console.log("Error when retreiving full article")
                });

        };


        // Publish Article
        $scope.publishArticle = function(article) {

            var id = $scope.article._id


            API.publishArticle(id)
                .success(function(article, status, headers, config) {
                    console.log("Article Successfully published")
                    store.remove('ActiveArticle');
                    $state.go('tabs.home');
                    $scope.article = null;
                    $scope.showPublish = false;

                })
                .error(function(article, status, headers, config) {
                    console.log("Error when retreiving full article")
                });


        };


    });

angular.module('starter.controllers')
.controller('ReaderController', function ($scope, $state, $rootScope,$ionicHistory, API, $stateParams, $cordovaInAppBrowser, $ionicPopover) {
    $scope.currentUserId = window.localStorage['SourceID'];

    $scope.$on('$ionicView.beforeEnter', function () {
        $scope.getContent();
    });

    $ionicPopover.fromTemplateUrl('templates/popover.html',
        { scope: $scope, })
        .then(function (popover) {
        $scope.popover = popover;
    });

    $scope.demo = 'ios';
    $scope.setPlatform = function (p) {
        document.body.classList.remove('platform-ios');
        document.body.classList.remove('platform-android');
        document.body.classList.add('platform-' + p);
        $scope.demo = p;
    };

    $scope.getContent = function () {
        // code goes here that gets the article information
        // and displays it before turning the public switch on

        var id = $stateParams.articleID;

        API.getArticle(id)
            .success(function (article, status, headers, config) {
                console.log(article);
                $scope.article = article;
                $scope.articleUrl = article.url;
                $scope.articleID = article._id;
                $scope.articleTitle = article.title;
                $scope.articleTime = article.created;
                $scope.articleImageUrl = article.imageUrl;
                $scope.articleContent = article.content;
                $scope.articleShortUrl = article.shortUrl;
                $scope.articleDate = article.created;
                $scope.username = article.username;
                $scope.usernameImage = article.gravatarURL;
            })
            .error(function (article, status, headers, config) {
                console.log("Something went wrong")
            });


    };

    $scope.saveForLater = function (articleID) {

        var userID = window.localStorage.SourceID;
        var articleID = $scope.articleID;

        var savedArticle = {
            articleID: articleID,
            userID: userID
        };

        console.log(savedArticle);

        API.saveForLater(savedArticle)
            .success(function (article, user, status, headers, config) {
                // make button reflect the change
                console.log("Article successfully saved for later")
            })
            .error(function (article, status, headers, config) {
                console.log("Error when saving the article for later")
            });

    };

    $scope.delete = function (articleId) {

        API.deleteArticle(articleId)
            .success(function (article, user, status, headers, config) {
                console.log("Article successfully deleted");
                $ionicHistory.goBack();
                //$state.go('tabs.home');
            })
            .error(function (article, status, headers, config) {
               console.log("Error when delete the article ");
        });

    };
    $scope.likeArticle = function (article) {
        console.log("like");
        // console.log("Like article triggered" + article);

        var userID = window.localStorage.SourceID;
        var articleID = article._id;
        var articleOwner = article._userID;
        var articleImageUrl = article.imageUrl;

        // console.log("Article Owner Username is " + articleOwnerUsername);

        var likedArticle = {
            articleID: articleID,
            imageUrl: articleImageUrl,
            userID: userID,
            created: Date.now(),
            articleOwner: articleOwner
        };

        console.log(likedArticle);

        API.likeArticle(likedArticle)
            .success(function (article, user, status, headers, config) {
                // make button reflect the change
                console.log("Article Successfully liked")
            })
            .error(function (article, status, headers, config) {
                console.log("Error when liking the article")
            });


    };

    $scope.openWebView = function (url) {
        console.log("test");

        $cordovaInAppBrowser.open(url, '_system')
            .then(function (event) {
                console.log("yay");
            }, function (event) {
                console.log("nay");
            });
    };
});

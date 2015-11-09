angular.module('starter.controllers')
.controller('HomeController', function ($rootScope, $scope, API) {
    $scope.isLiked = true;
    $scope.pageNumber = 1;
    $scope.itemsPerPage = 10;
    $scope.noMoreItemsAvailable = false;
    $scope.articles = [];

    $scope.getInitialHomeFeed = function () {
        var userID = window.localStorage.SourceID;

        API.getSaved(userID)
          .success(function (data, status, headers, config) {
              $scope.savedArticlesIds = [];
              // This is where you put the conditional for zero states
              for (var i = 0; i < data.length; i++) {
                  $scope.savedArticlesIds.push(data[i]._id);
              };
          })
          .error(function (users, status, headers, config) {
              console.log("Something went when getting list of saved articles")

          });
    };

    $scope.deleteSaved = function (articleID) {
        var userID = window.localStorage.SourceID;

        var savedArticle = {
            articleID: articleID,
            userID: userID
        };

        console.log(savedArticle);


        API.deleteSaved(savedArticle)
            .success(function (article, status, headers, config) {
                console.log("article delete");
                angular.forEach($scope.articles, function (art) {
                    if (art._id == articleID) {
                        art.isSavedByUser = false;
                    }
                });
            })
            .error(function (article, status, headers, config) {
            console.log("Something went wrong");
        });

    };

    $scope.saveForLater = function (articleID) {
        console.log("trigger");

        var userID = window.localStorage.SourceID;

        var savedArticle = {
            articleID: articleID,
            userID: userID
        };

        API.saveForLater(savedArticle)
            .then(function (data) {
            angular.forEach($scope.articles, function(art) {
                if (art._id == articleID) {
                    art.isSavedByUser = true;
                }
            });
        }, function (error) {
                console.log(error);
            });
    };

    $scope.likeArticle = function (article) {

        var userID = window.localStorage.SourceID;
        var articleID = article._id;
        var articleOwner = article._userID;
        var articleImageUrl = article.imageUrl;

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
                console.log("Article Successfully liked");
                angular.forEach($scope.articles, function (art) {
                    if (art._id == articleID) {
                        art.isLikedByUser = true;
                    }
                });

            })
            .error(function (article, status, headers, config) {
                console.log("Error when liking the article");
            });

    };

    $scope.unlikeArticle = function (article) {

        var userID = window.localStorage.SourceID;
        var articleID = article._id;

        var unlikedArticle = {
            articleID: articleID,
            userID: userID
        };

        console.log(unlikedArticle)


        API.putLikes(unlikedArticle)
            .success(function (article, user, status, headers, config) {
                console.log("Article Successfully unliked")
                angular.forEach($scope.articles, function (art) {
                    if (art._id == articleID) {
                        art.isLikedByUser = false;
                    }
                });
            })
            .error(function (article, status, headers, config) {
                console.log("Error when liking the article")
            });

    };

    $scope.loadMore = function () {
        var userID = window.localStorage.SourceID;
        var minDate = $scope.latestDate;

        var homeFeedPacketPaging = {
            userID: userID,
            minID: minDate,
            pageNumber: $scope.pageNumber,
            itemsPerPage: $scope.itemsPerPage
        };

        API.getHomeFeedPaging(homeFeedPacketPaging)
                .success(function (data) {
                    if (data.length > 0) {
                        // this pushes the returned array to articles
                        for (var i = 0; i < data.length; i++) {
                            // push data to article
                            $scope.articles.push(data[i]);

                            // like calculations
                            var articleLikers = data[i].likes; // this is an object of users who like the article
                            var results = articleLikers.indexOf(userID); // this is etheir -1 or 0
                            var specificArticle = data[i];
                            if (results >= 0) {
                                specificArticle["isLikedByUser"] = true;
                            } else {
                                specificArticle["isLikedByUser"] = false;
                            }

                            // saved for later
                            var savedArticleListIds = $scope.savedArticlesIds;
                            var specificArticleID = data[i]._id; // the id of the article in question
                            var savedArticleResults = savedArticleListIds.indexOf(specificArticleID); // need to do a better check here
                            if (savedArticleResults >= 0) {
                                specificArticle["isSavedByUser"] = true;
                            } else {
                                specificArticle["isSavedByUser"] = false;
                            }
                        };
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

    //constructor
    var init = function () {
        $scope.getInitialHomeFeed();

        $scope.pageNumber = 1;
        $scope.itemsPerPage = 10;
        // $scope.loadMore();
    };

    //$scope.$on('$ionicView.beforeLeave', function () {
    //    $scope.articles = [];
    //});

    $scope.$on('$ionicView.afterEnter', function () {
        init();
    });
});


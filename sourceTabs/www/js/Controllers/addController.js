angular.module('starter.controllers')
.controller('AddController', function ($scope, $rootScope, $window, API, store, $state) {
    $scope.model = {};
    // Allows us to post gravatar in preview
    
    $scope.article = {
        url: "",
        summary: ""
    };
    
    var userID = window.localStorage.SourceID;

    // Validation method
    $scope.postArticleForm = function () {
        if ($scope.addNewForm.$valid) {
            $scope.postArticle();
        } else {
            $scope.errorMessage = $scope.formatAlertMessage($scope.addNewForm.$error.required);
        }
    };

    // ==============================================
    // Post Article 
    // ==============================================
    // This function takes the form data, posts an article and then retreives the full article content
    $scope.postArticle = function () {
        // Convert long url into short url
        var linkElement = document.createElement('a');
        linkElement.href = $scope.article.url;
        $scope.shortUrl = linkElement.hostname;

        // Construct Article Object
        var article = {
            url: $scope.article.url,
            summary: $scope.article.summary,
            created: Date.now(),
            userID: userID,
            shortUrl: $scope.shortUrl
        };

    

        // API that posts the articles
        API.postArticle(article)
            .success(function (article, status, headers, config) {
                console.log("Article packet successfuly sent");
                var id = article._id;
                $scope.article = article;
                //$scope.getArticle(id);
                window.localStorage['ActiveArticle'] = id;
                //$scope.getPreview();
                $scope.showPublish = true;
            })
            .error(function (article, status, headers, config) {
                console.log("Error when posting the article packet");
            });
    };

    // Publish Article
    $scope.publishArticle = function () {
        var id = $scope.article._id;
        
        API.publishArticle(id, $scope.model.boardID)
            .success(function (article, status, headers, config) {
                console.log("Article Successfully published");
                store.remove('ActiveArticle');
                $state.go('tabs.home');
            })
            .error(function (article, status, headers, config) {
                console.log("Error when retreiving full article");
        });
    };

    $scope.formatAlertMessage = function (errors) {
        var messeage = 'This fields are required:\n';
        angular.forEach(errors, function (value, key) {
            messeage = messeage + value.$name + ",";
            value.$dirty = true;
        });
        return messeage;
    };

    //constructor
    var init = function () {
         API.getBoards(userID).then(function(response) {
             $scope.boards = response.data;
         });
    };

    $scope.$on('$ionicView.afterEnter', function () {
        init();
    });
});

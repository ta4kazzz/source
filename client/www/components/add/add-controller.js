angular.module('source')

.controller('addController', function($scope, $rootScope, $window, API, $state, auth) {
	// Allows us to post gravatar in preview
	$rootScope.auth = auth;

	// SETUP
	$scope.article = {
		url: "",
		summary: ""
	};

	// Add Article ==============================================
	// This function takes the form data, posts an article and then retreives the full article content
	$scope.addArticle = function() {
		var url 		= $scope.article.url;
	 	var summary 	= $scope.article.summary;
	 	var userID 		= window.localStorage.SourceUserID;

	 	// Construct Article Object
	 	var article = {
	 		url: url,
	 		summary: summary,
	 		created: Date.now(),
	 		userID: userID
	 	};

	 	// API that posts the articles
	 	API.addArticle(article)
	 		.success(function (article, status, headers, config) {
	 			console.log("Article packet successfuly sent");

	 			// API that gets the full Article
		 		API.getPreview(article._id)
		 		.success(function (article, status, headers, config) {
		 			$scope.article 			= article;
		 			$scope.article.title 	= article.title;
		 			$scope.article.time 	= article.created;
		 			$scope.article.imageUrl = article.imageUrl;
		 			$scope.article.summary 	= article.summary;
		 			$scope.article._id 		= article._id;
			 	})
			 	.error(function (article, status, headers, config) {
			 			console.log("Error when retreiving full article")
			 	});

	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Error when posting the article packet")
	 		});
	 };

	 // Publish Article
	 // This needs to set the public = YES and post the article in the users article array


	 $scope.publishArticle = function(articleId) {
	 	// Set public to yes
	 	var id = $scope.article._id;

 		API.publishArticle(id)
 			.success(function (articleId, status, headers, config) {
 				console.log("Article Successfully published")
 				$state.go('app.home');
	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Error when retreiving full article")
	 		});

	 // Add article to specific user




	 };





});
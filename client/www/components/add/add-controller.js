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
	 	var userID 		= window.localStorage.SourceID;

	 	var id = userID;

	 	API.getUser(id)
	 		.success(function (user, status, headers, config) {
	 			console.log("You got the user");
	 			console.log(user);
	 			$scope.username = user.username;
	 			$scope.gravatarURL = user.gravatarURL;
	 			postUser();

	 		})
	 		.error(function (article, status, headers, config) {
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
		 		gravatarURL: $scope.gravatarURL
		 	};

		 	console.log(article.gravatarURL);

		 	// API that posts the articles
		 	API.postArticle(article)
		 		.success(function (article, status, headers, config) {
		 			console.log("Article packet successfuly sent");
		 			var id =  article._id
		 			$scope.getArticle(id);
		 		})
		 		.error(function (article, status, headers, config) {
		 			console.log("Error when posting the article packet")
		 		});
	 	}

	 };



	 $scope.getArticle = function(id) {

 			// API that gets the full Article
	 		API.getArticle(id)
	 		.success(function (article, status, headers, config) {
	 			$scope.article 			= article;
	 			$scope.article.title 	= article.title;
	 			$scope.article.time 	= article.created;
	 			$scope.article.imageUrl = article.imageUrl;
	 			$scope.article.summary 	= article.summary;
	 			$scope.article._id 		= article._id;
	 			console.log("success!")
		 	})
		 	.error(function (article, status, headers, config) {
		 			console.log("Error when retreiving full article")
		 	});

	 };


	 // Publish Article
	 $scope.publishArticle = function(article) {

		var id = $scope.article._id


 		API.publishArticle(id)
 			.success(function (article, status, headers, config) {
 				console.log("Article Successfully published")

 				$state.go('app.home');
 				
	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Error when retreiving full article")
	 		});







	 };





});
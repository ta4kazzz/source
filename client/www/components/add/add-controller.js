angular.module('source')

.controller('addController', function($scope, $rootScope, $window, API, $state, auth) {

	 $rootScope.auth = auth;

	 $scope.article = {
	 	url: "",
	 	summary: ""
	 };

	 $scope.addArticle = function() {
	 	var url = this.article.url;
	 	var summary = this.article.summary;
	 	var userID = auth.profile.user_id;


	 	var article = {
	 		url: url,
	 		summary: summary,
	 		created: Date.now(),
	 		userID: userID
	 	};

	 	
	 	API.saveItem(article, article.user)
	 		.success(function (article, status, headers, config) {
	 			console.log("Article added successfully");

	 			// we have the id here and we want to pass it into this function
				// $scope.getPreview(article._id);

	 		API.getArticle(article._id)
	 		.success(function (article, status, headers, config) {
	 			$scope.articleTitle = article.title;
	 			$scope.articleTime = article.created;
	 			$scope.articleImageUrl = article.imageUrl;
	 			$scope.articleSummary = article.summary;
	 			$state.go('app.preview');
	 	
	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Something went wrong")
	 		});



	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Something went wrong")
	 		});
	 };


	 $scope.getPreview = function(id) {
	 	// var id = '54c05d41b62b2de2d328ebc2';

	 };





});
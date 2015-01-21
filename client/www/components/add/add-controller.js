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
	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Something went wrong")
	 		});


		$state.go('app.preview');

	 };

	 $scope.getArticle = function() {
	 	// code goes here that gets the article information 
	 	// and displays it before turning the public switch on
	 	var id = '54bf29011f5b74629bafce83';

	 	API.getArticle(id)
	 		.success(function (article, status, headers, config) {
	 			$scope.articleTitle = article.title;
	 			$scope.articleTime = article.created;
	 			$scope.articleImageUrl = article.imageUrl;
	 			$scope.articleSummary = article.summary;
	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Something went wrong")
	 		});
	 };





});
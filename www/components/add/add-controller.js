angular.module('source')

.controller('addController', function($scope, $rootScope, $window, $firebase) {


	 $scope.article = {
	 	url: "",
	 	summary: ""
	 };

	 $scope.addArticle = function() {
	 	var url = this.article.url;
	 	var summary = this.article.summary;

	 	// loading function goes here

	 	var article = {
	 		url: url,
	 		summary: summary,
	 		created: Date.now()
	 	};

	 	$scope.article = article;
		var articleRef = new Firebase('https://sourceapp.firebaseio.com/articles');
	    articleRef.push(article);
		$window.location.href = '#/app/preview';
	 };


	 $scope.postArticle = function() {

	 	console.log($scope.article.url)
	 };



});
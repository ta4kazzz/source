angular.module('source')

.controller('readerController', function($scope, $rootScope, API, $stateParams) {


		$scope.getReader = function() {
	 	// code goes here that gets the article information 
	 	// and displays it before turning the public switch on

		var id = $stateParams.articleID


	 	API.getArticle(id)
	 		.success(function (article, status, headers, config) {
	 			$scope.articleTitle = article.title;
	 			$scope.articleTime = article.created;
	 			$scope.articleImageUrl = article.imageUrl;
	 			$scope.articleContent = article.content;


	 		})
	 		.error(function (article, status, headers, config) {
	 			console.log("Something went wrong")
	 		});
	 };

});
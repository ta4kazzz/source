angular.module('source')

.controller('addController', function($scope, $rootScope, $window, API, auth) {

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


		$window.location.href = '#/app/preview';
	 };


});
angular.module('source.services', [])

	.factory('API', function ($rootScope, $http, $window, $ionicLoading) {

	    var baseURL = "http://localhost:8080";


	    $rootScope.show = function(text) {
	    	$rootScope.loading = $ionicLoading.show({
	    		content: text ? text : 'Loading',
	    		animation: 'fade-in',
	    		showBackdrop: true,
	    		maxWidth: 200,
	    		showDelay: 0
	    	});
	    };


	    //API STUFF - goes in services.
	    $rootScope.logout = function() {
	      // $rootScope.serToken("");
	      $window.location.href = '#/app/login';
	    };


	    $rootScope.setToken = function (token) {
	    	return $window.localStorage.token;
	    }






        return {
		      signup: function (form) {
		        return $http.post(baseURL+'/api/users', form);
		      }
	    };


	});
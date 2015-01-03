angular.module('source.services', [])


.constant('FBURL', "https://sourceapp.firebaseio.com/")

.factory('Auth', function($firebaseAuth, FBURL) {

	var ref = new Firebase(FBURL);
	return $firebaseAuth(ref);
	
});
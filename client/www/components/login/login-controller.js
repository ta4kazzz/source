angular.module('source')

.controller('loginController', function($scope, auth, $state, store) {



  auth.signin({
    closable: false,
    // This asks for the refresh token, So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    $state.go('app.home');
  }, function(error) {
    console.log("There was an error logging in", error);
  });


})
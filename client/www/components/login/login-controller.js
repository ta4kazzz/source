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
    // Stuff to send to auth schema
    console.log(auth.profile.user_id);
    // Stuff to send to user schema
    console.log(auth.profile.email);
    console.log(auth.profile.nickname);
    console.log(auth.profile.picture);

  }, function(error) {
    console.log("There was an error logging in", error);
  });





})
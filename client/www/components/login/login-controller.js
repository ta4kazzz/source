angular.module('source')

.controller('loginController', function($scope, store, $rootScope, API, $window, auth) {



    $scope.login = function() {
        auth.signin({
          authParams: {
            scope: 'openid offline_access',
            device: 'Mobile device'
          }
        }, function(profile, token, accessToken, state, refreshToken) {
          // Success callback
          store.set('profile', profile);
          store.set('token', token);
          store.set('refreshToken', refreshToken);
          $window.location.href = ('#/app/home');
        }, function() {
          // Error callback
        });
      }





    $scope.showLoginForm = true;



});
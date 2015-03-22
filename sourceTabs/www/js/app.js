// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers', 
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider,
  jwtInterceptorProvider, $httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Set up an abstract state for the login directive
  .state('landing', {
      url: '/landing',
      templateUrl: 'templates/landing.html',
      controller: 'loginCtrl'
  })
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
       controller: 'loginCtrl'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'loginCtrl'
  })


  // setup an abstract state for the tabs directive
  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    data: {
      requiresLogin: true
    }
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('tabs.explore', {
    url: '/explore',
    views: {
      'explore-tab': {
        templateUrl: 'templates/explore.html'
      }
    }
  })

  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'notifications-tab': {
        templateUrl: 'templates/notifications.html'
      }
    }
  })
  
  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/profile.html',
        controller: 'DashCtrl'
      }
    }
  })



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

  // Configure Auth0
  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginState: 'login'
  });



  jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
    var idToken = store.get('token');
    var refreshToken = store.get('refreshToken');
    if (!idToken || !refreshToken) {
      return null;
    }
    if (jwtHelper.isTokenExpired(idToken)) {
      return auth.refreshIdToken(refreshToken).then(function(idToken) {
        store.set('token', idToken);
        return idToken;
      });
    } else {
      return idToken;
    }
  }

  $httpProvider.interceptors.push('jwtInterceptor');

}).run(function($rootScope, auth, store) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        auth.authenticate(store.get('profile'), token);
      }
    }

  });
});

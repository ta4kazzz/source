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

  // ============================================
  // #HOME TABS
  // ============================================

  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab': {
        templateUrl: 'templates/home.html',
        controller: 'homeController'
      }
    }
  })

  .state('tabs.user', {
    url: '/user/:userID',
    views: {
      'home-tab': {
        templateUrl: 'templates/user.html',
        controller: 'userController'
      }
    }
  })

  .state('tabs.userFollowers', {
    url: "/user/:userID/followers",
    views: {
      'home-tab' :{
        templateUrl: 'templates/user-followers.html',
        controller: 'user-followers-controller'
      }
    }
  })

  .state('tabs.userFollowing', {
    url: "/user/:userID/following",
    views: {
      'home-tab' :{
        templateUrl: 'templates/user-following.html',
        controller: 'user-following-controller'
      }
    }
  })

  .state('tabs.readerHome', {
      url: '/reader/:articleID',
      views: {
        'home-tab' : {
          templateUrl: 'templates/reader.html',
          controller: 'readerController'
        }
      }
  })


  .state('tabs.likers', {
      url: '/articles/:articleID/likers',
      views: {
        'home-tab' : {
          templateUrl: 'templates/likers.html',
          controller: 'likers-controller'
        }
      }
  })




  // ============================================
  // #PROFILE TABS
  // ============================================



  .state('tabs.readerProfile', {
      url: '/reader/:articleID',
      views: {
        'profile-tab' : {
          templateUrl: 'templates/reader.html',
          controller: 'readerController'
        }
      }
  })


  .state('tabs.profile', {
    url: '/profile',
    views: {
      'profile-tab': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('tabs.profileFollowers', {
    url: "/profile/followers",
    views: {
      'profile-tab' :{
        templateUrl: 'templates/profile-followers.html',
        controller: 'profile-followers-controller'
      }
    }
  })

  .state('tabs.profileFollowing', {
    url: "/profile/following",
    views: {
      'profile-tab' :{
        templateUrl: 'templates/profile-following.html',
        controller: 'profile-following-controller'
      }
    }
  })

  .state('tabs.settings', {
    url: '/profile/settings',
    views: {
      'profile-tab': {
        templateUrl: 'templates/settings.html',
        controller: 'settings-controller'
      }
    }
  })

  .state('tabs.edit-settings', {
    url: '/profile/edit-settings',
    views: {
      'profile-tab': {
        templateUrl: 'templates/edit-settings.html',
        controller: 'settings-controller'
      }
    }
  })




  // ============================================
  // #Explore TABS
  // ============================================


  .state('tabs.explore', {
    url: '/explore',
    views: {
      'explore-tab': {
        templateUrl: 'templates/explore.html',
        controller: 'exploreController'
      }
    }
  })

  // ============================================
  // #Notifications TABS
  // ============================================


  .state('tabs.notifications', {
    url: '/notifications',
    views: {
      'notifications-tab': {
        templateUrl: 'templates/notifications.html',
        controller: 'notifications-controller'
      }
    }
  })

  // ============================================
  // #Modals TABS
  // ============================================

  .state('add', {
      url: '/add',
      templateUrl: 'templates/add.html',
      controller: 'addController'
  })

  .state('likers', {
    url: '/articles/:articleID/likers',
    templateUrl: 'templates/likers.html',
    controller: 'likers-controller'
  })


  .state('saved', {
      url: '/saved',
      templateUrl: 'templates/saved.html',
      controller: 'savedController'
  })



    .state('reader', {
      url: '/reader/:articleID',
      templateUrl: 'templates/reader.html',
      controller: 'readerController'
  })

  .state('preview', {
      url: '/preview/:articleID',
      templateUrl: 'templates/preview.html',
      controller: 'addController'
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

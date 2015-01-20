// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('source', ['ionic', 'source.controllers', 'source.services', 'auth0', 'angular-storage','angular-jwt'])



//                            Added all these as scope variables? can be accessed anywhere
.run(function($ionicPlatform, $rootScope, $window, auth, $location, store, jwtHelper) {
  // This hooks all auth events to check everything as soon as the app starts
  auth.hookEvents();

  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          // Either show Login page or use the refresh token to get a new idToken
          $location.path('#/app/landing');
        }
      }
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the 2 bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider) {
  $stateProvider



    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "components/menu/menu.html",
      controller: 'AppCtrl'
    })


    // Source specific menus

    .state('app.landing', {
      url: "/landing",
      views: {
        'menuContent' :{
          templateUrl: "components/landing/landing.html",
          controller: 'loginController'
        }
      }
    })


    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "components/home/home.html",
          controller: 'homeController',
        }
      }
    })

    .state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "components/login/login.html",
          controller: 'loginController'
        }
      }
    })

    // Components

    .state('app.add', {
      url: "/add",
      views: {
        'menuContent' :{
          templateUrl: "components/add/add.html",
          controller: 'addController'
        }
      }
    })

    .state('app.preview', {
      url: "/preview",
      views: {
        'menuContent' :{
          templateUrl: "components/preview/preview.html",
          controller: 'addController'
        }
      }
    })

    .state('app.discussion', {
      url: "/discussion",
      views: {
        'menuContent' :{
          templateUrl: "components/discussion/discussion.html",
          controller: 'discussionController'
        }
      }
    })

    .state('app.explore', {
      url: "/explore",
      views: {
        'menuContent' :{
          templateUrl: "components/explore/explore.html",
          controller: 'exploreController'
        }
      }
    })

    .state('app.followers', {
      url: "/followers",
      views: {
        'menuContent' :{
          templateUrl: "components/followers/followers.html",
          controller: 'followersController'
        }
      }
    })

    .state('app.following', {
      url: "/following",
      views: {
        'menuContent' :{
          templateUrl: "components/following/following.html",
          controller: 'followingController'
        }
      }
    })



    .state('app.notifications', {
      url: "/notifications",
      views: {
        'menuContent' :{
          templateUrl: "components/notifications/notifications.html",
          controller: 'notificationsController'
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "components/profile/profile.html",
          controller: 'profileController'
        }
      }
    })

    .state('app.reader', {
      url: "/reader",
      views: {
        'menuContent' :{
          templateUrl: "components/reader/reader.html",
          controller: 'readerController'
        }
      }
    })


    .state('app.settings', {
      url: "/settings",
      views: {
        'menuContent' :{
          templateUrl: "components/settings/settings.html",
          controller: 'settingsController'
        }
      }
    })

    .state('app.signup', {
      url: "/signup",
      views: {
        'menuContent' :{
          templateUrl: "components/signup/signup.html",
          controller: 'signupController'
        }
      }
    })

    .state('app.user', {
      url: "/user",
      views: {
        'menuContent' :{
          templateUrl: "components/user/user.html",
          controller: 'userController'
        }
      }
    })

    authProvider.init({
      domain: 'source.auth0.com',
      clientID: '5md4FZ4xtmmiMyUfiiIfccAGTXdSR8cJ',
      loginState: 'login'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landing');
});

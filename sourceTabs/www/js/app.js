//for dev
var base = "http://localhost:8080";
//for production
//var base = "http://source-application.herokuapp.com";

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'auth0', 'angular-storage'])
    .constant("base", base)
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
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
    .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, $sceProvider) {
        $stateProvider
            // Set up an abstract state for the login directive
            .state('landing', {
                url: '/landing',
                templateUrl: 'templates/landing.html',
                controller: 'LoginCtrl'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'templates/signup.html',
                controller: 'LoginCtrl'
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
                        controller: 'HomeController'
                    }
                },
                cache: false
            })
            .state('tabs.likers', {
                url: '/articles/:articleID/likers',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/likers.html',
                        controller: 'LikersController'
                    }
                }
            })
            .state('tabs.user', {
                url: '/user/:userID',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/user.html',
                        controller: 'UserController'
                    }
                }
            })
            .state('tabs.userFollowers', {
                url: "/user/:userID/followers",
                views: {
                    'home-tab': {
                        templateUrl: 'templates/user-followers.html',
                        controller: 'UserFollowersController'
                    }
                }
            })
            .state('tabs.userFollowing', {
                url: "/user/:userID/following",
                views: {
                    'home-tab': {
                        templateUrl: 'templates/user-following.html',
                        controller: 'UserFollowingController'
                    }
                }
            })
            .state('tabs.readerHome', {
                url: '/reader/:articleID',
                views: {
                    'home-tab': {
                        templateUrl: 'templates/reader.html',
                        controller: 'ReaderController'
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
                        controller: 'ExploreController'
                    }
                }
            })
            .state('tabs.userExplore', {
                url: '/user/:userID',
                views: {
                    'explore-tab': {
                        templateUrl: 'templates/explore-user.html',
                        controller: 'UserController'
                    }
                }
            })
            .state('tabs.userFollowersExplore', {
                url: "/user/:userID/followers",
                views: {
                    'explore-tab': {
                        templateUrl: 'templates/explore-user-followers.html',
                        controller: 'UserFollowersController'
                    }
                }
            })
            .state('tabs.userFollowingExplore', {
                url: "/user/:userID/following",
                views: {
                    'explore-tab': {
                        templateUrl: 'templates/explore-user-following.html',
                        controller: 'UserFollowingController'
                    }
                }
            })
            .state('tabs.readerExplore', {
                url: '/reader/:articleID',
                views: {
                    'explore-tab': {
                        templateUrl: 'templates/reader.html',
                        controller: 'ReaderController'
                    }
                }
            })

            // ============================================
            // #PROFILE TABS
            // ============================================
            .state('tabs.readerProfile', {
                url: '/reader/:articleID',
                views: {
                    'profile-tab': {
                        templateUrl: 'templates/reader.html',
                        controller: 'ReaderController'
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
                    'profile-tab': {
                        templateUrl: 'templates/profile-followers.html',
                        controller: 'ProfileFollowersController'
                    }
                }
            })
            .state('tabs.profileFollowing', {
                url: "/profile/following",
                views: {
                    'profile-tab': {
                        templateUrl: 'templates/profile-following.html',
                        controller: 'ProfileFollowingController'
                    }
                }
            })
            .state('tabs.settings', {
                url: '/profile/settings',
                views: {
                    'profile-tab': {
                        templateUrl: 'templates/settings.html',
                        controller: 'SettingsController'
                    }
                }
            })
            .state('tabs.edit-settings', {
                url: '/profile/edit-settings',
                views: {
                    'profile-tab': {
                        templateUrl: 'templates/edit-settings.html',
                        controller: 'SettingsController'
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
                        controller: 'NotificationsController'
                    }
                }
            })
            .state('tabs.userNotificaitons', {
                url: '/user/:userID',
                views: {
                    'notifications-tab': {
                        templateUrl: 'templates/notifications-user.html',
                        controller: 'UserController'
                    }
                }
            })
            .state('tabs.userFollowersNotificaitons', {
                url: "/user/:userID/followers",
                views: {
                    'notifications-tab': {
                        templateUrl: 'templates/notifications-user-followers.html',
                        controller: 'UserFollowersController'
                    }
                }
            })
            .state('tabs.userFollowingNotificaitons', {
                url: "/user/:userID/following",
                views: {
                    'notifications-tab': {
                        templateUrl: 'templates/notifications-user-following.html',
                        controller: 'UserFollowingController'
                    }
                }
            })
            .state('tabs.readerNotificaitons', {
                url: '/reader/:articleID',
                views: {
                    'notifications-tab': {
                        templateUrl: 'templates/reader.html',
                        controller: 'ReaderController'
                    }
                }
            })


            // ============================================
            // #Modals TABS
            // ============================================
            .state('add', {
                url: '/add',
                templateUrl: 'templates/add.html',
                controller: 'AddController',
                cache: false
            })
            .state('likers', {
                url: '/articles/:articleID/likers',
                templateUrl: 'templates/likers.html',
                controller: 'LikersController'
            })
            .state('saved', {
                url: '/saved',
                templateUrl: 'templates/saved.html',
                controller: 'SavedController'
            })
            .state('reader', {
                url: '/reader/:articleID',
                templateUrl: 'templates/reader.html',
                controller: 'ReaderController'
            })
            .state('preview', {
                url: '/preview/:articleID',
                templateUrl: 'templates/preview.html',
                controller: 'AddController'
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
//.run(function ($rootScope, auth, store) {
//    $rootScope.$on('$locationChangeStart', function () {
//        if (!auth.isAuthenticated) {
//            var token = store.get('token');
//            if (token) {
//                auth.authenticate(store.get('profile'), token);
//            }
//        }
//    });
//});

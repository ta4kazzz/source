angular.module('starter.controllers')
.controller('LoginCtrl', function ($scope, auth, $state, $location, $http, API, store) {
    // SETUP
    $scope.loginForm = {
        email: "",
        password: ""
    };

    $scope.signupForm = {
        email: "",
        username: "",
        password: ""
    };

    // LOGIN ============================================
    $scope.login = function () {
        auth.signin({connection: 'Username-Password-Authentication',username: $scope.loginForm.email,password: $scope.loginForm.password}, onLoginSuccess, onLoginFailed);
    };

    function onLoginSuccess(profile, token) {
        console.log("Login Success!");
        store.set('profile', profile);
        store.set('token', token);
        setCurrentUser(profile);
    }

    function onLoginFailed() {
        console.log("Your login attempt failed");
        alert('Login failed');
    }

    // the goal of this function is to set the mongoID in the localstorage
    // It takes profile as a parameter
    function setCurrentUser(profile) {
        var id = profile.user_id;

        API.getAuth(id)
          .success(function (user, status, headers, config) {
              // need to store it here without strings
              window.localStorage['SourceID'] = user._id;
              // store.set('SourceID', user._id);
              $scope.followYourself();
              $state.go('tabs.home');
          })
          .error(function (user, status, headers, config) {
              console.log("woops");
          });
    };

    $scope.followYourself = function () {
        // the ID is the person who is logged in and doing the adding action
        var id = window.localStorage.SourceID;
        // The user is who we want to "follow" - or add to alices's list
        var user = {
            _id: window.localStorage.SourceID
        };

        API.followUser(id, user)
          .success(function (user, status, headers, config) {
              // turn the button to unfolow
              console.log("sent")
              console.log(user);
              //   $scope.getUser();
          })
          .error(function (user, status, headers, config) {
              console.log("Something went wrong")
          });
    };

    // SIGNUP ==========================================
    $scope.signup = function () {
        var email = $scope.signupForm.email;
        var password = $scope.signupForm.password;
        var username = $scope.signupForm.username;

        var newUser = {
            email: email,
            password: password,
            username: username
        };
        
        // Creates a User in Auth0 Database
        API.createUserAuth(newUser)
        .success(function (data, status, headers, config, profile) {
            if (status === 200) {
                auth.signin({
                    connection: 'Username-Password-Authentication',
                    username: newUser.email,
                    password: newUser.password
                }, onSignupSuccess, onSignupFailed);
            }
        })
        .error(function (data, status, headers, config) {
            alert('Error creating account for user');
        });
    };

    function onSignupSuccess(profile, token, data) {
        console.log("Successfully logged in with your new credentials!");
        store.set('profile', profile);
        store.set('token', token);


        createUser(profile);
    }

    function onSignupFailed() {
        console.log("your signup failed bro");
        alert('Login failed');
    }

    // This adds a user to the database
    function createUser(profile) {
        var email = $scope.signupForm.email
        var username = $scope.signupForm.username
        var authID = profile.user_id;
        var gravatarURL = profile.picture;
        console.log(gravatarURL);

        var user = {
            email: email,
            username: username,
            authID: authID,
            gravatarURL: gravatarURL
        };

        // We know this works
        console.log(user);

        API.postUser(user)
          .success(function (article, status, headers, config) {
              console.log("user created sucessfully")
              setCurrentUser(profile);
          })
          .error(function (article, status, headers, config) {
              console.log("Something went wrong when posting user to database")
          });
    };

    // function doAuth() {

    //   auth.signin({
    //     closable: false,
    //     // This asks for the refresh token
    //     // So that the user never has to log in again
    //     authParams: {
    //       scope: 'openid offline_access'
    //     }
    //   }, function(profile, idToken, accessToken, state, refreshToken) {
    //     store.set('profile', profile);
    //     store.set('token', idToken);
    //     store.set('refreshToken', refreshToken);
    //     $state.go('tab.home');
    //   }, function(error) {
    //     console.log("There was an error logging in", error);
    //   });
    // }

    // $scope.$on('$ionic.reconnectScope', function() {
    //   doAuth();
    // });

    // doAuth();



});

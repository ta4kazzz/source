angular.module('starter.controllers')
.controller('LoginCtrl', function ($scope, $state, $location, $http, API, store) {
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

    $scope.followYourself = function () {
        // the ID is the person who is logged in and doing the adding action
        var id = window.localStorage.SourceID;
        // The user is who we want to "follow" - or add to alices's list
        var user = {
            _id: window.localStorage.SourceID
        };

        API.followUser(id, user).success(function (user, status, headers, config) {
            // turn the button to unfolow
            console.log("sent");
            console.log(user);
        })
          .error(function (user, status, headers, config) {
              console.log("Something went wrong");
          });
    };

    // LOGIN ============================================
    $scope.login = function () {
        API.connect($scope.loginForm.email, $scope.loginForm.password)
         .success(function (data, status, headers, config, profile) {
             if (status === 200) {
                 console.log("Login Success!");
                 store.set('profile', profile);
                 // need to store it here without strings
                 window.localStorage['SourceID'] = data[0]._id;
                 $state.go('tabs.home');
             }
         })
        .error(function (error, status, headers, config) {
            console.log(error.status + ":" + error.data);
            $scope.errorMessage = error.data;
            alert('Error connecting user');
        });
        // auth.signin({connection: 'Username-Password-Authentication',username: $scope.loginForm.email,password: $scope.loginForm.password}, onLoginSuccess, onLoginFailed);
    };

    // the goal of this function is to set the mongoID in the localstorage
    // It takes profile as a parameter
    //function setCurrentUser(profile) {
    //    var id = profile.user_id;

    //    API.getAuth(id)
    //      .success(function (user, status, headers, config) {
    //          // need to store it here without strings
    //          window.localStorage['SourceID'] = user._id;
    //          // store.set('SourceID', user._id);
    //          $scope.followYourself();
    //          $state.go('tabs.home');
    //      })
    //      .error(function (user, status, headers, config) {
    //          console.log("woops");
    //      });
    //};



    // SIGNUP ==========================================
    $scope.signup = function () {
        var email = $scope.signupForm.email;
        var password = $scope.signupForm.password;
        var username = $scope.signupForm.username;

        API.signupUser(username, email, password)
        .success(function (data, status, headers, config, profile) {
            if (status === 200) {
                if (data.name === 'UserExistsError') {
                    console.log(data.message);
                    alert(data.message);
                    return;
                }
                // gravatar needs to be implementd server side on sign up so the user can 
                // get gravatar image if it exists.
                console.log("Successfully logged in with your new credentials!");
                store.set('profile', profile);

                window.localStorage['SourceID'] = data._id;
                // store.set('SourceID', user._id);
                $scope.followYourself();
                $state.go('tabs.home');

                //  store.set('token', token);
            }
        })
        .error(function (error, status, headers, config) {
            console.log(error.status + ":" + error.data);

            $scope.errorMessage = error.data;
            alert('Error creating account for user');
        });
    };

    //function onSignupSuccess(profile, token, data) {
    //    console.log("Successfully logged in with your new credentials!");
    //    store.set('profile', profile);
    //    store.set('token', token);


    //    createUser(profile);
    //}

    //function onSignupFailed() {
    //    console.log("your signup failed bro");
    //    alert('Login failed');
    //}

    // This adds a user to the database
    //function createUser(profile) {
    //    var email = $scope.signupForm.email
    //    var username = $scope.signupForm.username
    //    var authID = profile.user_id;
    //    var gravatarURL = profile.picture;
    //    console.log(gravatarURL);

    //    var user = {
    //        email: email,
    //        username: username,
    //        authID: authID,
    //        gravatarURL: gravatarURL
    //    };

    //    // We know this works
    //    console.log(user);

    //    API.postUser(user)
    //      .success(function (article, status, headers, config) {
    //          console.log("user created sucessfully")
    //          setCurrentUser(profile);
    //      })
    //      .error(function (article, status, headers, config) {
    //          console.log("Something went wrong when posting user to database")
    //      });
    //};

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

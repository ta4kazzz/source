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
                 window.localStorage['SourceID'] = data._id;
                 $state.go('tabs.home');
             }
         })
        .error(function (error, status, headers, config) {
            console.log(error);
            alert('Error connecting user');
        });
        // auth.signin({connection: 'Username-Password-Authentication',username: $scope.loginForm.email,password: $scope.loginForm.password}, onLoginSuccess, onLoginFailed);
    };

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
        .error(function (error, status, headers, config, t) {
            console.log(config);
            alert('Error creating account for user');
        });
    };

    $scope.clickLoginWithFacebook = function () {
        if (typeof facebookConnectPlugin != "undefined") {
            facebookConnectPlugin.login(["public_profile,email"],
                function (userData) {
                    //console.log("UserInfo: " + JSON.stringify(userData));
                    $scope.getBasicFacebookData(userData.authResponse.accessToken);
                },
                function (error) {
                    console.log(error);
                    // alert("" + error);
                });
        }
    };

    $scope.getBasicFacebookData = function (fb_access_token) {
        facebookConnectPlugin.api("/me/?fields=email,picture,id,name,first_name,last_name", ["public_profile"],
            function (result) {
                //alert("Result: " + JSON.stringify(result) + " = " + fb_access_token);
                API.registerFacebookUser(result.email, fb_access_token, result.id, result.name, result.picture.data.url)
                    .success(function (data, status, headers, config, profile) {
                        if (status === 200 && data.errors == null) {
                            console.log("Successfully logged in with your new credentials!");
                            store.set('profile', data);
                            window.localStorage['picture_url'] = data.picture_url; // fb picture

                            window.localStorage['SourceID'] = data._id;

                            $state.go('tabs.home');
                        } else {
                            console.log(data.errors);
                        }
                    }).error(function (error, status, headers, config) {
                        console.log(error);
                        alert('Error creating fb for user');
                    });

            },
            function (error) {
                alert("Failed: " + error);
            });
    };

    $scope.twitterLogin = function () {
        TwitterConnect.login(function (result) {
            var pictureUrl = 'https://twitter.com/' + result.userName + '/profile_image?size=normal';

            API.registerTwitterUser(result.userName, result.userId, result.secret, result.token, pictureUrl)
           .success(function (data, status, headers, config, profile) {
               if (status === 200) {
                   console.log("Successfully logged in with your new credentials!");
                   store.set('profile', data);
                   window.localStorage['picture_url'] = data.gravatarURL; // fb picture

                   window.localStorage['SourceID'] = data._id;

                   $state.go('tabs.home');
               }
           }).error(function (error, status, headers, config) {
               console.log(error);
               alert('Error creating fb for user');
           });

            console.log('Successful login!');
            console.log(result);
        }, function (error) {
            console.log('Error logging in');
            console.log(error);
        });
    };
});

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, auth, store, $state) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    $state.go('landing', {}, {reload: true});
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('addController', function($scope, $state) {


 

  $scope.addNew = function() {

    console.log("test");

   $state.go('tabs.home');



  };













})


.controller('ProfileCtrl', function($rootScope, $scope, auth, API) {
$scope.auth = auth;
  


  $scope.getProfile = function() {

    var id  = window.localStorage.SourceID;

    API.getUser(id)
      .success(function (user, status, headers, config) {
        console.log("Your profile successfully retreived")
        $scope.username = user.username;
        $scope.followsNum = user.counts.follows;
        $scope.followersNum = user.counts.followed_by;
      })
      .error(function (user, status, headers, config) {
        console.log("Your profile was not retreived")

      });

  };


  $scope.getProfileFeed = function() {

   var user_id    = window.localStorage.SourceID;

    $scope.data = API.getUsersArticles(user_id)
      .success(function (data, status, headers, config) {
        $scope.articles = [];

        for (var i = 0; i < data.length; i++) {
            if (data[i].public == true) {
                $scope.articles.push(data[i]);
            }
        };


      })
      .error(function (article, status, headers, config) {
        console.log("Something went wrong")
      });



  };


  






})


// =================================================================
//                           LOGIN CONTROLLER 
//  ================================================================


.controller('loginCtrl', function($scope, auth, $state, $location, $http, API, store) {

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

  $scope.login = function() {
    auth.signin({
      connection: 'Username-Password-Authentication',
      username:   $scope.loginForm.email,
      password:   $scope.loginForm.password
    }, onLoginSuccess, onLoginFailed);
  };

  function onLoginSuccess(profile, token) {
    console.log("Login Success!");
    store.set('profile', profile);
    store.set('token', token);
    setCurrentUser(profile);
    $state.go('tabs.home');
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
      })
      .error(function (user, status, headers, config) {
        console.log("woops")
      });

  };






// SIGNUP ==========================================

  $scope.signup = function () {

    var email       = $scope.signupForm.email
    var password    = $scope.signupForm.password
    var username    = $scope.signupForm.username

    var newUser = {
      email: email,
      password: password,
      username: username
    };

    // Creates a User in Auth0 Database
    $http({
      method: 'POST', 
      url: 'http://source-application.herokuapp.com/signup',
      data: {
        email:      newUser.email,
        username:   newUser.username,
        password:   newUser.password
      }
    })


    .success(function (data, status, headers, config, profile) {
      if (status === 200) {
        auth.signin({
          connection: 'Username-Password-Authentication',
          username:   newUser.email,
          password:   newUser.password
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
    setCurrentUser(profile);
    $state.go('tabs.home');
    createUser(profile);
  }

  function onSignupFailed() {
    console.log("your signup failed bro");
    alert('Login failed');
  }

  // This adds a user to the database
  function createUser(profile) {
    var email       = $scope.signupForm.email
    var username    = $scope.signupForm.username
    var authID      = profile.user_id;
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


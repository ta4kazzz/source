angular.module('source')

.controller('loginController', function($scope, auth, $state, $location, $http, API, store) {


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
    // Store these things in local storage
    store.set('profile', profile);
    store.set('token', token);
    setCurrentUser(profile);
    $state.go('app.home');
  }

  function onLoginFailed() {
    console.log("Your login attempt failed");
    alert('Login failed');
  }

  // the goal of this function is to set the mongoID in the localstorage
  // It takes profile as a parameter
  function setCurrentUser(profile) {
    // 1) take auth profile id
    console.log(profile.user_id);
    // 2) search Mongo for a user with that ID
    $http({
      method: 'GET', 
      url: 'http://localhost:8080/auth',
      data: {
        email:      newUser.email,
        username:   newUser.username,
        password:   newUser.password
      }
    })
    // 3) store that UsersID as a variable in local

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
      url: 'http://localhost:8080/signup',
      data: {
        email:      newUser.email,
        username:   newUser.username,
        password:   newUser.password
      }
    })


    .success(function (data, status, headers, config) {
      if (status === 200) {
        // This Calls the function that adds it to the DB
        createUser(newUser);
        // Normal signin function
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
    $state.go('app.home');
  }

  function onSignupFailed() {
    console.log("your signup failed bro");
    alert('Login failed');
  }

  // This adds a user to the database
  function createUser(signup) {
    API.signup(signup)
      .success(function (article, status, headers, config) {
        console.log("user created sucessfully")
      })
      .error(function (article, status, headers, config) {
        console.log("Something went wrong when posting user to database")
      });

  }






})
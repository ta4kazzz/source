angular.module('source')

.controller('loginController', function($scope, auth, $state, $location, $http, API, store) {

   $scope.user = {
      email: "",
      password: ""
   };


  // LOGIN
  $scope.doLogin = function() {
    // $scope.loading = true;
    var email = this.user.email;
    var password = this.user.password;


    var user = {
      email: email,
      password: password
    };

    console.log(user.email);
    console.log(user.password);

    auth.signin({
      connection: 'Username-Password-Authentication',
      username:   user.email,
      password:   user.password
    }, onLoginSuccess, onLoginFailed);
  };


  function onLoginSuccess(profile, token) {
    // $scope.loading = false;
    $state.go('app.home');
    console.log("hooray!");
    store.set('profile', profile);
    store.set('token', token);
  }

  function onLoginFailed() {
    // $scope.loading = false;
    console.log("you failed bro");
    alert('Login failed');
  }





  // SIGNUP
  $scope.doSignup = function () {

    // $scope.loading = true;
    var email = this.signup.email;
    var password = this.signup.password;
    var username = this.signup.username;


    var signup = {
      email: email,
      password: password,
      username: username
    };


    // I still dont know what this is exactly
  
    $http({
      method: 'POST', 
      url: 'http://localhost:8080/custom-signup',
      data: {
        email:      signup.email,
        username:   signup.username,
        password:   signup.password
      }
    })


    .success(function (data, status, headers, config) {
      if (status === 200) {
        createUser(signup);


        auth.signin({
          // Make sure that connection matches your server-side connection id
          connection: 'Username-Password-Authentication',
          username:   signup.email,
          password:   signup.password
        }, onSignupSuccess, onSignupFailed);
      }
    })
    .error(function (data, status, headers, config) {
      alert('Error creating account for user ' + signup.user + ': '  + data);
    });
  };

  function onSignupSuccess(profile, token, data) {
    // $scope.loading = false;
    console.log("hooray!");
    store.set('profile', profile);
    store.set('token', token);
    console.log(data);
    $state.go('app.home');
  }

  function onSignupFailed() {
    // $scope.loading = false;
    console.log("your signup failed bro");
    alert('Login failed');
  }

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
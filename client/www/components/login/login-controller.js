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
      password:   user.password,
      authParams: {
        scope: 'openid name email'
      }
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

    console.log(signup.email);
    console.log(signup.password);
    console.log(signup.username);



    // SERVICE CALL TO API GOES HERE
  


    $http({
      method: 'POST', 
      url: 'http://localhost:8080/api/auth',
      data: {
        email:    signup.email,
        userId:   signup.username
      }
    })


    .success(function (data, status, headers, config) {
      if (status === 200) {
        auth.signin({
          // Make sure that connection matches your server-side connection id
          connection: 'Username-Password-Authentication',
          username:   signup.email,
          password:   signup.password
        }, onLoginSuccess, onLoginFailed);
      }
    })
    .error(function (data, status, headers, config) {
      alert('Error creating account for user ' + $scope.signup.user + ': '  + data);
    });
  };









  // auth.signin({
  //   closable: false,
  //   // This asks for the refresh token, So that the user never has to log in again
  //   authParams: {
  //     scope: 'openid offline_access'
  //   }
  // }, function(profile, idToken, accessToken, state, refreshToken) {
  //   store.set('profile', profile);
  //   store.set('token', idToken);
  //   store.set('refreshToken', refreshToken);
  //   $state.go('app.home');
  //   // Stuff to send to auth schema


  //   // console.log(auth.profile.user_id);
  //   // // Stuff to send to user schema
  //   // console.log(auth.profile.email);
  //   // console.log(auth.profile.nickname);
  //   // console.log(auth.profile.picture);

  // }, function(error) {
  //   console.log("There was an error logging in", error);
  // });





})
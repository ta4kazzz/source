// =================================================================
// TABLE OF CONTENTS
//
//
//
//
//
//
//
//
//
//
//  ================================================================





angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, auth, store, $state) {

  $scope.logout = function() {
    auth.signout();
    store.remove('token');
    store.remove('profile');
    store.remove('refreshToken');
    store.remove('SourceID');
    $state.go('landing', {}, {reload: true});
  };

})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('profile-followers-controller', function($scope, API) {

  $scope.getFollowers = function() {

   var id     = window.localStorage.SourceID;

    $scope.users = API.getFollowers(id)
      .success(function (data, status, headers, config) {
        $scope.users = [];

        for (var i = 0; i < data.length; i++) {
          $scope.users.push(data[i]);
        };


      })
      .error(function (users, status, headers, config) {
        console.log("Something went wrong")
      });

  };

})

.controller('profile-following-controller', function($scope, $rootScope, auth, API) {

  $scope.getFollows = function() {

   var id     = window.localStorage.SourceID;

    $scope.users = API.getFollows(id)
      .success(function (data, status, headers, config) {
        $scope.users = [];

        for (var i = 0; i < data.length; i++) {
          $scope.users.push(data[i]);
        };


      })
      .error(function (users, status, headers, config) {
        console.log("Something went wrong")
      });

  };

})

.controller('user-followers-controller', function($scope, $rootScope, auth, API,  $stateParams) {

  $scope.getFollowers = function() {

   var id     = $stateParams.userID;

    $scope.users = API.getFollowers(id)
      .success(function (data, status, headers, config) {
        $scope.users = [];

        for (var i = 0; i < data.length; i++) {
          $scope.users.push(data[i]);
        };


      })
      .error(function (users, status, headers, config) {
        console.log("Something went wrong")
      });

  };


})


.controller('user-following-controller', function($scope, $rootScope, auth, API,  $stateParams) {

$scope.getFollows = function() {

   var id     = $stateParams.userID;

    $scope.users = API.getFollows(id)
      .success(function (data, status, headers, config) {
        $scope.users = [];

        for (var i = 0; i < data.length; i++) {
          $scope.users.push(data[i]);
        };


      })
      .error(function (users, status, headers, config) {
        console.log("Something went wrong")
      });

  };

})





// =================================================================
//                           USER CONTROLLER
//  ================================================================


.controller('userController', function($scope, $rootScope, API, $stateParams) {

  // if the user follows this user then showme = true

  $scope.user_id = $stateParams.userID;



  $scope.followUser = function() {
    // the ID is the person who is logged in and doing the adding action
    var id = window.localStorage.SourceID;
    // The user is who we want to "follow" - or add to pat's list
    var user = {
      _id: $stateParams.userID
    };

    API.followUser(id, user)
      .success(function (user, status, headers, config) {
          // turn the button to unfolow
          console.log("sent")
          console.log(user);
        })
      .error(function (user, status, headers, config) {
          console.log("Something went wrong")
        });

  };



  $scope.unfollowUser = function() {

    // the ID is the person who is logged in and doing the adding action
    var id = window.localStorage.SourceID;

    // The user is who we want to "follow" - or add to pat's list
    var user = {
      _id: $stateParams.userID
    };

    API.unfollowUser(id, user)
      .success(function (user, status, headers, config) {
          // turn the button to unfolow
          console.log("sent")
          console.log(user);
        })
      .error(function (user, status, headers, config) {
          console.log("Something went wrong")
        });

  };


  $scope.getUser = function() {
  // code goes here that gets the user information

  var id = $stateParams.userID;
  console.log(id);

  API.getUser(id)
    .success(function (user, status, headers, config) {
      $scope.username = user.username;
      $scope.gravatarURL = user.gravatarURL;
      $scope.getFollowers();
      $scope.getFollows();
    })
    .error(function (user, status, headers, config) {
      console.log("Something went wrong")
    });



            $scope.getFollowers = function() {
             // var id     = $stateParams.userID;
              $scope.users = API.getFollowers(id)
                .success(function (data, status, headers, config) {
                  $scope.users = [];
                  $scope.followerNumber = data.length;

                  // if our name is in the list, then turn that thing to true
                  // turn that variable true/false

                })
                .error(function (users, status, headers, config) {
                  console.log("Something went wrong")
                });
            };




            $scope.getFollows = function() {
               var id     = $stateParams.userID;
                $scope.users = API.getFollows(id)
                  .success(function (data, status, headers, config) {
                    $scope.users = [];

                    console.log(data.length);
                   $scope. followingNumber = data.length;



                  })
                  .error(function (users, status, headers, config) {
                    console.log("Something went wrong")
                  });

              };
  };




  $scope.getUserFeed = function() {

    var user_id = $stateParams.userID;

    $scope.data = API.getUsersArticles(user_id)
      .success(function (data, status, headers, config) {
        $scope.articles = [];

        $scope.articleNumber = data.length;

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
//                           #EXPLORE CONTROLLER
//  ================================================================

.controller('exploreController', function($scope, API, auth, $rootScope) {

   $rootScope.auth = auth;

   $scope.getAllArticles = function() {
     $scope.data = API.getArticles()
        .success(function (data, status, headers, config) {
         $scope.articles = [];

              for (var i = 0; i < data.length; i++) {
                  if (data[i].public == true) {
                      $scope.articles.push(data[i]);
                  }
              };


        }).error(function (data, status, headers, config) {
              console.log('someting went wrong')
          });
   };


   $scope.getAllUsers = function() {
     $scope.data = API.getUsers()
        .success(function (data, status, headers, config) {
         $scope.users = [];

              for (var i = 0; i < data.length; i++) {
                  $scope.users.push(data[i]);
              };


        }).error(function (data, status, headers, config) {
              console.log('someting went wrong')
          });
   };

})

// =================================================================
//                           #HOME CONTROLLER
//  ================================================================

.controller('homeController', function($rootScope, $scope, auth, API, $timeout, $stateParams) {
   $rootScope.auth = auth;

  $scope.doRefresh = function() {

    $scope.getAllArticles();

    console.log('Refreshing');

    $timeout(function() {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.$broadcast('scroll.refreshComplete');
    }, 1250);
  };


  $scope.saveForLater = function(articleID) {

    var userID      = window.localStorage.SourceID;
    var articleID    = articleID;

    var savedArticle = {
      articleID: articleID,
      userID: userID
    };

    console.log(savedArticle);

    API.saveForLater(savedArticle)
      .success(function (article, user, status, headers, config) {
        // make button reflect the change
        console.log("Article successfully saved for later")
      })
      .error(function (article, status, headers, config) {
        console.log("Error when saving the article for later")
      });

  };



  $scope.likeArticle = function() {

  };


  $scope.getAllArticles = function() {
     $scope.data = API.getArticles()
        .success(function (data, status, headers, config) {
         $scope.articles = [];
              for (var i = 0; i < data.length; i++) {
                  if (data[i].public == true) {
                      $scope.articles.push(data[i]);
                  }
              };
        }).error(function (data, status, headers, config) {
              console.log('someting went wrong')
          });
   };



   $scope.getHomeFeed = function() {
     var id  = window.localStorage.SourceID;

     $scope.data = API.getHomeFeed(id)
        .success(function (data, status, headers, config) {
         $scope.articles = [];
              for (var i = 0; i < data.length; i++) {
                  if (data[i].public == true) {
                      $scope.articles.push(data[i]);
                  }
              };
        }).error(function (data, status, headers, config) {
              console.log('someting went wrong')
          });
   };


})


// =================================================================
//                           #READER CONTROLLER
//  ================================================================


.controller('readerController', function($scope, $rootScope, API, $stateParams) {

  $scope.getContent = function() {
  // code goes here that gets the article information
  // and displays it before turning the public switch on

  var id = $stateParams.articleID;

  API.getArticle(id)
    .success(function (article, status, headers, config) {
      $scope.articleTitle = article.title;
      $scope.articleTime = article.created;
      $scope.articleImageUrl = article.imageUrl;
      $scope.articleContent = article.content;


    })
    .error(function (article, status, headers, config) {
      console.log("Something went wrong")
    });


  };



})


// =================================================================
//                           #Add Controller
//  ================================================================

.controller('addController', function($scope, $rootScope, $window, API, store, $state, auth) {


// Allows us to post gravatar in preview
  $rootScope.auth = auth;

  // SETUP
  $scope.article = {
    url: "",
    summary: ""
  };

  // Add Article ==============================================
  // This function takes the form data, posts an article and then retreives the full article content
  $scope.addArticle = function() {
    var url       = $scope.article.url;
    var summary   = $scope.article.summary;
    var userID    = window.localStorage.SourceID;

    var id = userID;

    API.getUser(id)
      .success(function (user, status, headers, config) {
        console.log("You got the user");
        console.log(user);
        $scope.username = user.username;
        $scope.gravatarURL = user.gravatarURL;
        postUser();

      })
      .error(function (article, status, headers, config) {
        console.log("error when getting the user")
      });



    function postUser() {
      // Construct Article Object
      var article = {
        url: url,
        summary: summary,
        created: Date.now(),
        userID: userID,
        username: $scope.username,
        gravatarURL: $scope.gravatarURL
      };

      console.log(article.gravatarURL);

      // API that posts the articles
      API.postArticle(article)
        .success(function (article, status, headers, config) {
          console.log("Article packet successfuly sent");
          var id =  article._id
          $scope.getArticle(id);
          window.localStorage['ActiveArticle'] = id;

          $state.go('preview');
        })
        .error(function (article, status, headers, config) {
          console.log("Error when posting the article packet")
        });
    }

   };





   $scope.getPreview = function() {

    var id  = window.localStorage.ActiveArticle;

    $scope.getArticle(id);

   };




   $scope.getArticle = function(id) {

      // API that gets the full Article
      API.getArticle(id)
      .success(function (article, status, headers, config) {
        $scope.article      = article;
        $scope.article.title  = article.title;
        $scope.article.time   = article.created;
        $scope.article.imageUrl = article.imageUrl;
        $scope.article.summary  = article.summary;
        $scope.article._id    = article._id;
        console.log("success!")
      })
      .error(function (article, status, headers, config) {
          console.log("Error when retreiving full article")
      });

   };


   // Publish Article
   $scope.publishArticle = function(article) {

    var id = $scope.article._id


    API.publishArticle(id)
      .success(function (article, status, headers, config) {
        console.log("Article Successfully published")
        store.remove('ActiveArticle');
        $state.go('tabs.home');

      })
      .error(function (article, status, headers, config) {
        console.log("Error when retreiving full article")
      });



   };



})


// =================================================================
//                           #SAVED_CONTROLLER
//  ================================================================

.controller('savedController', function($scope, API) {

  $scope.getSaved = function() {


    var id   = window.localStorage.SourceID;


     $scope.users = API.getSaved(id)
       .success(function (data, status, headers, config) {
         $scope.articles = [];

         for (var i = 0; i < data.length; i++) {
           $scope.articles.push(data[i]);
         };

         $scope.savedArticlesNumber = data.length;


       })
       .error(function (users, status, headers, config) {
         console.log("Something went wrong")
       });





  };


})




// =================================================================
//                           #PROFILE_CONTROLLER
//  ================================================================


.controller('ProfileCtrl', function($rootScope, $scope, auth, API, $stateParams) {


$scope.auth = auth;

  $scope.getProfile = function() {

    var id  = window.localStorage.SourceID;

    API.getUser(id)
      .success(function (user, status, headers, config) {
        console.log("Your profile successfully retreived")
        $scope.username = user.username;
        // $scope.followsNum = user.counts.follows;
        // $scope.followersNum = user.counts.followed_by;
      $scope.getFollowers();
      $scope.getFollows();

      })
      .error(function (user, status, headers, config) {
        console.log("Your profile was not retreived")

      });


            $scope.getFollowers = function() {
             // var id     = $stateParams.userID;
              $scope.users = API.getFollowers(id)
                .success(function (data, status, headers, config) {
                  $scope.users = [];
                  $scope.profileFollowerNumber = data.length;

                  // if our name is in the list, then turn that thing to true
                  // turn that variable true/false

                })
                .error(function (users, status, headers, config) {
                  console.log("Something went wrong")
                });
            };


            $scope.getFollows = function() {
                $scope.users = API.getFollows(id)
                  .success(function (data, status, headers, config) {
                    $scope.users = [];
                    console.log(data.length);
                    $scope.profileFollowingNumber = data.length;



                  })
                  .error(function (users, status, headers, config) {
                    console.log("Something went wrong")
                  });

              };



  };


  $scope.getProfileFeed = function() {

   var user_id    = window.localStorage.SourceID;

    $scope.data = API.getUsersArticles(user_id)
      .success(function (data, status, headers, config) {
        $scope.articles = [];

       $scope.profileArticleNumber = data.length;


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

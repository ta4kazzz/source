// =================================================================
//  CONTROLLERS
//  ================================================================





angular.module('starter.controllers', [
  'ionic',
  'ngCordova',
  'ion-affix',
  'ionic.ion.headerShrink'
])


// =================================================================
//  #Notification
//  ================================================================

.controller('notifications-controller', function($scope, auth, store, $state, API) {

  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getNotifications();
  });

  $scope.getNotifications = function() {

   var userID     = window.localStorage.SourceID;

    $scope.notifications = API.getNotifications(userID)
      .success(function (data, status, headers, config) {
        $scope.notifications = [];
        console.log(data);

        for (var i = 0; i < data.length; i++) {
          $scope.notifications.push(data[i]);
        };

      })
      .error(function (users, status, headers, config) {
        console.log("notify me cause its broken")
      });

  };



})


// =================================================================
//  #Settings
//  ================================================================


.controller('settings-controller', function($scope, auth, store, $state, API) {


  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getProfile();
  });



  $scope.editProfileForm = {
     email: "",
     username: "",
     description: ""
  };


  $scope.editUser = function() {

    // ID of the person using
    var userID  = window.localStorage.SourceID;

    var email       = $scope.editProfileForm.email
    var username    = $scope.editProfileForm.username
    var description  = $scope.editProfileForm.description

    var user = {
      email: email,
      username: username,
      userID: userID,
      description: description
    };



    API.putUser(user)
      .success(function (user, status, headers, config) {
        $state.go('tabs.settings');
      })
      .error(function (user, status, headers, config) {
        console.log("Your profile was not retreived")

      });


  };



  $scope.getProfile = function() {

    var id  = window.localStorage.SourceID;

    API.getUser(id)
      .success(function (user, status, headers, config) {
        console.log("Your profile successfully retreived")

        $scope.username = user.username;
        $scope.email = user.email;
        $scope.description = user.description;
        console.log(user.description);
        console.log($scope.description);

        // Adds them to the edit profile form
        $scope.editProfileForm.username = user.username;
        $scope.editProfileForm.email = user.email;
        $scope.editProfileForm.description = user.description;


      })
      .error(function (user, status, headers, config) {
        console.log("Your profile was not retreived")

      });
  };



})









// =================================================================
//  #Dash
//  ================================================================

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


// =================================================================
//  #chats
//  ================================================================
.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})


// =================================================================
//  #Profile Followers Controller
//  ================================================================
.controller('profile-followers-controller', function($scope, API) {

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getFollowers();
  });

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

// =================================================================
//  #Profile Following Controller
//  ================================================================

.controller('profile-following-controller', function($scope, $rootScope, auth, API) {

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getFollows();
  });

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


// =================================================================
//  #user-follower
//  ================================================================


.controller('user-followers-controller', function($scope, $rootScope, auth, API,  $stateParams) {

  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getFollowers();
  });

  $scope.getFollowers = function() {

   var id     = $stateParams.userID;
   console.log("whats the " + id);

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

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getFollows();
  });

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
//                           #USER CONTROLLER
//  ================================================================


.controller('userController', function($scope, $rootScope, API, $stateParams) {


  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getUser();
    $scope.getUserFeed();
  });


  // if the user follows this user then showme = true
  $scope.user_id = $stateParams.userID;


  $scope.followUser = function() {
    // the ID is the person who is logged in and doing the adding action
    var id = window.localStorage.SourceID;
    // The user is who we want to "follow" - or add to alices's list
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


  var myid = window.localStorage.SourceID;
  var id = $stateParams.userID;

  API.getUser(myid)
    .success(function (user, status, headers, config) {

        var myFollows = user.follows;
        var result = myFollows.indexOf(id);

        if (result >= 0) {
          console.log("You are following this user");
            $scope.relationship = 'following';
        } else {
          console.log("You are not following this user");
          $scope.relationship = 'notFollowing';
        }

    })
    .error(function (user, status, headers, config) {
      console.log("Something went wrong")
    });




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


            // GET FOLLOWERS
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



            // GET FOLLOWS
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
//                           #LIKERS CONTROLLER
//  ================================================================

.controller('likers-controller', function($scope, API, $stateParams) {

  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getLiked();
  });


  $scope.getLiked = function() {

    // this needs to be the article
    var id   = $stateParams.articleID;

     $scope.users = API.getLikers(id)
       .success(function (data, status, headers, config) {

         console.log(data);

         $scope.users = [];

         for (var i = 0; i < data.length; i++) {
           $scope.users.push(data[i]);
         };

         $scope.savedArticlesNumber = data.length;


       })
       .error(function (users, status, headers, config) {
         console.log("Something went wrong")
       });

  };

})



// =================================================================
//                           #EXPLORE CONTROLLER
//  ================================================================

.controller('exploreController', function($scope, API, auth, $rootScope) {
      // Auth Init - Do I need this here?
      $rootScope.auth = auth;

      // Tab Logic
      $scope.tab = 1;

      $scope.setTab = function(newTab){
        $scope.tab = newTab;
      };

      $scope.isSet = function(tabNum){
        return $scope.tab === tabNum;
      };


      // On before you ender the pag run this function
      $scope.$on('$ionicView.beforeEnter', function(){
        $scope.getAllArticles();
        $scope.getAllUsers();
        $scope.getTopLiked();
      });


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


   $scope.getTopLiked = function() {

     console.log("Getting Top Liked Trigger")

     $scope.data = API.getTopArticles()
        .success(function (data, status, headers, config) {

          $scope.topArticles = [];

               for (var i = 0; i < data.length; i++) {
                   if (data[i].public == true) {
                       $scope.topArticles.push(data[i]);
                   }
               };



          console.log("Got all the top articles")


        }).error(function (data, status, headers, config) {
              console.log('someting went wrong')
          });


   };

})

// =================================================================
//                           #HOME CONTROLLER
//  ================================================================

.controller('homeController', function($rootScope, $scope, auth, API, $timeout, $stateParams) {


  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getHomeFeed();
  });



   $rootScope.auth = auth;

  $scope.doRefresh = function() {

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



  $scope.likeArticle = function(article) {

    // console.log("Like article triggered" + article);

    var userID               = window.localStorage.SourceID;
    var articleID            = article._id;
    var articleOwner         = article._userID;
    var articleImageUrl      = article.imageUrl;

    // console.log("Article Owner Username is " + articleOwnerUsername);

    var likedArticle = {
      articleID: articleID,
      imageUrl: articleImageUrl,
      userID: userID,
      created:  Date.now(),
      articleOwner: articleOwner
    };

    console.log(likedArticle);

    API.likeArticle(likedArticle)
      .success(function (article, user, status, headers, config) {
        // make button reflect the change
        console.log("Article Successfully liked")
        // $scope.alreadyLiked = true;
      })
      .error(function (article, status, headers, config) {
        console.log("Error when liking the article")
      });


  };


  $scope.unlikeArticle = function(articleID) {

    console.log("Unlike Article Triggered");

    var userID      = window.localStorage.SourceID;
    var articleID   = articleID;

    var unlikedArticle = {
      articleID: articleID,
      userID: userID
    };

    console.log(unlikedArticle);

    API.putLikes(unlikedArticle)
      .success(function (article, user, status, headers, config) {
        // make button reflect the change
        console.log("Article Successfully liked")
      })
      .error(function (article, status, headers, config) {
        console.log("Error when liking the article")
      });

  };




  $scope.getHomeFeed = function() {

    var userID      = window.localStorage.SourceID;

    API.getHomeFeed(userID)
      .success(function (data, user, status, headers, config) {
               $scope.articles = [];



                // this pushes the returned array to articles
                for (var i = 0; i < data.length; i++) {
                    // push data to article
                    $scope.articles.push(data[i]);

                    var articleLikers = data[i].likes;
                    var results = articleLikers.indexOf(userID);


                    if (results >= 0) {
                      console.log("You like this article");
                      // push liked=true to specific object in articles array
                      console.log($scope.articles)

                    } else {
                      console.log("You do not like this article");

                    }

                };


      })
      .error(function (data, status, headers, config) {
        console.log("Error when getting home feed")
      });


  };




})


// =================================================================
//                           #READER CONTROLLER
//  ================================================================


.controller('readerController', function($scope, $rootScope, API, $stateParams, $cordovaInAppBrowser) {


    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.getContent();
    });

  $scope.getContent = function() {
  // code goes here that gets the article information
  // and displays it before turning the public switch on

  var id = $stateParams.articleID;

  API.getArticle(id)
    .success(function (article, status, headers, config) {
      console.log(article);
      $scope.article = article;
      $scope.articleUrl = article.url;
      $scope.articleID = article._id;
      $scope.articleTitle = article.title;
      $scope.articleTime = article.created;
      $scope.articleImageUrl = article.imageUrl;
      $scope.articleContent = article.content;
      $scope.articleShortUrl = article.shortUrl;
      $scope.articleDate = article.created;
      $scope.username = article.username;
      $scope.usernameImage = article.gravatarURL;
    })
    .error(function (article, status, headers, config) {
      console.log("Something went wrong")
    });


  };




  $scope.saveForLater = function(articleID) {

    var userID      = window.localStorage.SourceID;
    var articleID    = $scope.articleID;

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


  $scope.likeArticle = function(article) {
    console.log("like");
    // console.log("Like article triggered" + article);

    var userID               = window.localStorage.SourceID;
    var articleID            = article._id;
    var articleOwner         = article._userID;
    var articleImageUrl      = article.imageUrl;

    // console.log("Article Owner Username is " + articleOwnerUsername);

    var likedArticle = {
      articleID: articleID,
      imageUrl: articleImageUrl,
      userID: userID,
      created:  Date.now(),
      articleOwner: articleOwner
    };

    console.log(likedArticle);

    API.likeArticle(likedArticle)
      .success(function (article, user, status, headers, config) {
        // make button reflect the change
        console.log("Article Successfully liked")
      })
      .error(function (article, status, headers, config) {
        console.log("Error when liking the article")
      });


  };

  $scope.openWebView = function(url) {
    console.log("test");
    $cordovaInAppBrowser
       .open(url, '_system')
       .then(function(event) {
         console.log("yay");
       }, function(event) {
         console.log("nay");
      });


  }



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

    // Convert long url into short url
    var parser = document.createElement('a');
    parser.href = url;
    var shortUrl = parser.hostname;

    // Gets User info so we can attach that to article
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
        gravatarURL: $scope.gravatarURL,
        shortUrl: shortUrl
      };


      // API that posts the articles
      API.postArticle(article)
        .success(function (article, status, headers, config) {
          console.log("Article packet successfuly sent");
          var id =  article._id
          $scope.getArticle(id);
          window.localStorage['ActiveArticle'] = id;
          $scope.getPreview()
          // $state.go('preview');
          $scope.showPublish = true;
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

  // On before you ender the pag run this function
  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.getSaved();
  });



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

  $scope.deleteSaved = function(articleID) {


    var userID      = window.localStorage.SourceID;
    var articleID    = articleID;

    var savedArticle = {
      articleID: articleID,
      userID: userID
    };

    console.log(savedArticle);


    API.deleteSaved(savedArticle)
      .success(function (article, status, headers, config) {
          console.log("article delete")
        })
      .error(function (article, status, headers, config) {
          console.log("Something went wrong")
        });

  };


})




// =================================================================
//                           #PROFILE_CONTROLLER
//  ================================================================


.controller('ProfileCtrl', function($rootScope, $scope, auth, API, $stateParams) {



    $scope.$on('$ionicView.beforeEnter', function(){
      $scope.getProfile();
      $scope.getProfileFeed();
    });


$scope.auth = auth;


  $scope.getProfile = function() {

    var id  = window.localStorage.SourceID;

    API.getUser(id)
      .success(function (user, status, headers, config) {
        console.log("Your profile successfully retreived")
        $scope.username = user.username;
        $scope.description = user.description;
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

   var userID    = window.localStorage.SourceID;

    $scope.data = API.getUsersArticles(userID)
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

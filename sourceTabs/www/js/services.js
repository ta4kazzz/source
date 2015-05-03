angular.module('starter.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, auth, store) {

    var base = "http://localhost:8080";
    // var base = "http://source-application.herokuapp.com";


    // Somewher in here we need to define a $scope.loading


    // $rootScope.setUsername = function (username) {
    //     return $window.localStorage.username = username;
    // };

    // $rootScope.setPassword = function (password) {
    //     return $window.localStorage.password = password;
    // };

    // $rootScope.getUsername = function () {
    //     return $window.localStorage.username;
    // };

    // $rootScope.getPassword = function () {
    //     return $window.localStorage.password;
    // };


    $rootScope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      store.remove('SourceID');
      $window.location.href = '#/app/landing';
    }

    // $rootScope.setToken = function (token) {
    //     return $window.localStorage.token = token;
    // }

    // $rootScope.getToken = function () {
    //     return $window.localStorage.token;
    // }

    // $rootScope.isSessionActive = function () {
    //     return $window.localStorage.token ? true : false;
    // }


    return {

        //  =====================================================
        //   ARTICLES
        //  =====================================================



        getArticles: function () {
            return $http.get(base+'/api/articles', {
                method: 'GET',
           });
        },

        postArticle: function (article) {
            return $http.post(base+'/api/articles', article, {
                method: 'POST',
            });
        },

        getArticle: function (id) {
            return $http.get(base+'/api/articles/' + id, {
                method: 'GET',
            });
        },

        deleteArticle: function (id) {
            return $http.delete(base+'/api/articles', + id, {
                method: 'DELETE',
            });
        },

        publishArticle: function (id) {
            return $http.put(base+'/api/articles/' + id, {
                method: 'PUT',
            });
        },

        likeArticle: function (likedArticle) {
            return $http.post(base+'/api/articles/' + likedArticle.userID + '/likes', likedArticle, {
                method: 'POST',
            });
        },

        getLikers: function (id) {
            return $http.get(base+'/api/articles/' + id + '/likes', {
                method: 'GET',
            });
        },

        putLikes: function (unlikedArticle) {
            return $http.put(base+'/api/articles/' + unlikedArticle.userID + '/likes', unlikedArticle, {
                method: 'PUT',
            });
        },

        getTopArticles: function () {
            return $http.get(base+'/api/articles/top', {
                method: 'GET',
           });
        },


        //  =====================================================
        //   USERS
        //  =====================================================


        getHomeFeed: function (userID) {
            return $http.get(base+'/api/users/' + userID +'/homefeed', {
                method: 'GET',
           });
        },

        getUsers: function (id) {
            return $http.get(base+'/api/users', {
                method: 'GET',
            });
        },


        getUser: function (id) {
            return $http.get(base+'/api/users/' + id, {
                method: 'GET',
            });
        },


        postUser: function (user) {
            return $http.post(base+'/api/users', user, {
                method: 'POST',
            });
        },

        getAuth: function (id) {
            return $http.get(base+'/api/users/auth/' + id, {
                method: 'GET',
            });
        },


        getUsersArticles: function (id) {
            return $http.get(base+'/api/users/' + id +'/articles', {
                method: 'GET',
            });
        },

        getFollows: function (id) {
            return $http.get(base+'/api/users/' + id +'/follows', {
                method: 'GET',
            });
        },

        followUser: function (id, user) {
            return $http.post(base+'/api/users/' + id + '/follows', user, {
                method: 'POST',
            });
        },

        unfollowUser: function (id, user) {
            return $http.put(base+'/api/users/' + id + '/follows', user, {
                method: 'PUT',
            });
        },

        getFollowers: function (id) {
            return $http.get(base+'/api/users/' + id +'/followers', {
                method: 'GET',
            });
        },

        saveForLater: function (savedArticle) {
            return $http.post(base+'/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'POST',
            });
        },

        getSaved: function (id) {
            return $http.get(base+'/api/users/' + id +'/saved', {
                method: 'GET',
            });
        },

        deleteSaved: function (savedArticle) {
            return $http.put(base+'/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'PUT',
            });
        },


    }


});

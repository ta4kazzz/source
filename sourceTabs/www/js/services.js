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


        //  =====================================================
        //   USERS
        //  =====================================================

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

        getHomeFeed: function (id) {
            return $http.get(base+'/api/users/' + id +'/feed', {
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

        saveForLater: function (id, user) {
            return $http.post(base+'/api/users/' + id + '/saved', user, {
                method: 'POST',
            });
        },




    }


});

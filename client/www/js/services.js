angular.module('source.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, auth, store) {

    var base = "http://localhost:8080";
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
            return $http.get(base+'/api/articles/', + id, {
                method: 'GET',
            });
        },

        deleteArticle: function (id) {
            return $http.delete(base+'/api/articles', + id, {
                method: 'DELETE',
            });
        },

        putArticle: function (id) {
            return $http.put(base+'/api/articles', + id, {
                method: 'PUT',
            });
        },


        //  =====================================================
        //   USERS
        //  =====================================================

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

        getUser: function (id) {
            return $http.get(base+'/api/users/auth/' + id, {
                method: 'GET',
            });
        },
        





    }


});
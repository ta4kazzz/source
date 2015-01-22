angular.module('source.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, auth, store) {

    var base = "http://localhost:8080";



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
        login: function (form) {
            return $http.post(base+'/api/auth/login', form);
        },
        signup: function (form) {
            return $http.post(base+'/api/users', form);
        },
        getAll: function () {
            return $http.get(base+'/api/articles', {
                method: 'GET',
            });
        },
        // This get's one article
        getArticle: function (id) {
            return $http.get(base+'/api/articles/' + id, {
                method: 'GET',
            });
        },
        // Add new article here
        saveItem: function (article) {
            return $http.post(base+'/api/articles/', article, {
                method: 'POST'
            });
        },
        putItem: function (id, form, email) {
            return $http.put(base+'/api/v1/bucketList/data/item/' + id, form, {
                method: 'PUT',
                params: {
                    token: email
                }
            });
        },
        deleteItem: function (id, email) {
            return $http.delete(base+'/api/v1/bucketList/data/item/' + id, {
                method: 'DELETE',
                params: {
                    token: email
                }
            });
        }
    }


});
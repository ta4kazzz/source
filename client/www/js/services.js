angular.module('source.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading) {

    var base = "http://localhost:8080";



    $rootScope.setUsername = function (username) {
        return $window.localStorage.username = username;
    };

    $rootScope.setPassword = function (password) {
        return $window.localStorage.password = password;
    };

    $rootScope.getUsername = function () {
        return $window.localStorage.username;
    };

    $rootScope.getPassword = function () {
        return $window.localStorage.password;
    };


    $rootScope.logout = function () {
        // $rootScope.setToken("");
        $rootScope.setPassword("");
        $rootScope.setUsername("");
        $window.location.href = '#/app/login';
    };

    // $rootScope.setToken = function (token) {
    //     return $window.localStorage.token = token;
    // }

    // $rootScope.getToken = function () {
    //     return $window.localStorage.token;
    // }

    $rootScope.isSessionActive = function () {
        return $window.localStorage.token ? true : false;
    }


    return {
        login: function (form) {
            return $http.post(base+'/api/auth/login', form);
        },
        signup: function (form) {
            return $http.post(base+'/api/users', form);
        },
        getAll: function (email) {
            return $http.get(base+'/api/v1/bucketList/data/list', {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        getOne: function (id, email) {
            return $http.get(base+'/api/v1/bucketList/data/item/' + id, {
                method: 'GET',
                params: {
                    token: email
                }
            });
        },
        // Add new article here
        saveItem: function (article, email) {
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
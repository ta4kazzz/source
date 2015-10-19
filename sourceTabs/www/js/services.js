angular.module('starter.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, auth, store,base) {

    $rootScope.logout = function () {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        store.remove('SourceID');
        $window.location.href = '#/app/landing';
    };

    return {

        //  =====================================================
        //   ARTICLE
        //  =====================================================
        postArticle: function(article) {
            return $http.post(base + '/api/articles', article, {
                method: 'POST',
            });
        },

        getArticle: function(id) {
            return $http.get(base + '/api/articles/' + id, {
                method: 'GET',
            });
        },

        deleteArticle: function(id) {
            return $http.delete(base + '/api/articles', + id, {
                method: 'DELETE',
            });
        },

        publishArticle: function(id) {
            return $http.put(base + '/api/articles/' + id, {
                method: 'PUT',
            });
        },

        //  =====================================================
        //   ARTICLES
        //  =====================================================

        getArticles: function() {
            return $http.get(base + '/api/articles', {
                method: 'GET',
            });
        },

        getTopArticles: function() {
            return $http.get(base + '/api/articles/top', {
                method: 'GET',
            });
        },

        //  =====================================================
        //   ARTICLE LIKE SYSTEM
        //  =====================================================


        likeArticle: function(likedArticle) {
            return $http.post(base + '/api/articles/' + likedArticle.userID + '/likes', likedArticle, {
                method: 'POST',
            });
        },

        putLikes: function(unlikedArticle) {
            return $http.put(base + '/api/articles/' + unlikedArticle.userID + '/likes', unlikedArticle, {
                method: 'PUT',
            });
        },

        getLikers: function(id) {
            return $http.get(base + '/api/articles/' + id + '/likes', {
                method: 'GET',
            });
        },


        //  =====================================================
        //   USER
        //  =====================================================

        postUser: function(user) {
            return $http.post(base + '/api/users', user, {
                method: 'POST',
            });
        },

        getUser: function(id) {
            return $http.get(base + '/api/users/' + id, {
                method: 'GET',
            });
        },

        putUser: function(user) {
            return $http.put(base + '/api/users/' + user.userID, user, {
                method: 'PUT',
            });
        },

        getHomeFeed: function(homeFeedPacket) {
            return $http.post(base + '/api/users/' + homeFeedPacket.userID + '/homefeed', homeFeedPacket, {
                method: 'POST',
            });
        },

        getHomeFeedPaging: function(homeFeedPacket) {
            return $http.post(base + '/api/users/homefeedpaging/' + homeFeedPacket.userID, homeFeedPacket, {
                method: 'POST',
            });
        },

        createUserAuth: function(newUser) {
            // Creates a User in Auth0 Database
          return  $http({method: 'POST',
                url: base+'/signup',
                //'http://localhost:8080/signup',
                //url: 'http://source-application.herokuapp.com/signup',
                data: {
                    email: newUser.email,
                    username: newUser.username,
                    password: newUser.password
                }
            });
        },

        //  =====================================================
        //   USERS
        //  =====================================================

        getUsers: function(id) {
            return $http.get(base + '/api/users', {
                method: 'GET',
            });
        },

        //  =====================================================
        //   AUTH
        //  =====================================================
        connect: function (username, password) {
            var apiURL = base + 'connect?username='
            + username + '&password='
            + password;

            // Return the promise to the controller
            return $http({ withCredentials: true, method: 'POST', url: apiURL });
        },

        getAuth: function(id) {
            return $http.get(base + '/api/users/auth/' + id, {
                method: 'GET',
            });
        },


        getUsersArticles: function(userID) {
            return $http.get(base + '/api/users/' + userID + '/articles', {
                method: 'GET',
            });
        },

        getFollows: function(id) {
            return $http.get(base + '/api/users/' + id + '/follows', {
                method: 'GET',
            });
        },

        followUser: function(id, user) {
            return $http.post(base + '/api/users/' + id + '/follows', user, {
                method: 'POST',
            });
        },

        unfollowUser: function(id, user) {
            return $http.put(base + '/api/users/' + id + '/follows', user, {
                method: 'PUT',
            });
        },

        getFollowers: function(id) {
            return $http.get(base + '/api/users/' + id + '/followers', {
                method: 'GET',
            });
        },

        saveForLater: function(savedArticle) {
            return $http.post(base + '/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'POST',
            });
        },

        getSaved: function(id) {
            return $http.get(base + '/api/users/' + id + '/saved', {
                method: 'GET',
            });
        },

        deleteSaved: function(savedArticle) {
            return $http.put(base + '/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'PUT',
            });
        },

        //  =====================================================
        //   NOTIFICATIONS
        //  =====================================================

        getNotifications: function(userID) {
            return $http.get(base + '/api/users/' + userID + '/notifications', {
                method: 'GET',
            });
        },
    };
});

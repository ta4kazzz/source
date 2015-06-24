angular.module('starter.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, auth, store) {

    var base = "http://localhost:8080";
    // var base = "http://source-application.herokuapp.com";

    $rootScope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      store.remove('SourceID');
      $window.location.href = '#/app/landing';
    }


    return {

        //  =====================================================
        //   ARTICLE
        //  =====================================================

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
        //   ARTICLES
        //  =====================================================

        getArticles: function () {
            return $http.get(base+'/api/articles', {
                method: 'GET',
           });
        },

        getTopArticles: function () {
            return $http.get(base+'/api/articles/top', {
                method: 'GET',
           });
        },

        //  =====================================================
        //   ARTICLE LIKE SYSTEM
        //  =====================================================


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


        //  =====================================================
        //   USER
        //  =====================================================

        postUser: function (user) {
            return $http.post(base+'/api/users', user, {
                method: 'POST',
            });
        },

        getUser: function (id) {
            return $http.get(base+'/api/users/' + id, {
                method: 'GET',
            });
        },

        putUser: function (user) {
            return $http.put(base+'/api/users/' + user.userID, user, {
                method: 'PUT',
            });
        },

        getHomeFeed: function (userID) {
            return $http.get(base+'/api/users/' + userID +'/homefeed', {
                method: 'GET',
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

        //  =====================================================
        //   AUTH
        //  =====================================================

        getAuth: function (id) {
            return $http.get(base+'/api/users/auth/' + id, {
                method: 'GET',
            });
        },


        getUsersArticles: function (userID) {
            return $http.get(base+'/api/users/' + userID +'/articles', {
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

        //  =====================================================
        //   NOTIFICATIONS
        //  =====================================================

        getNotifications: function (userID) {
            return $http.get(base+'/api/users/' + userID +'/notifications', {
                method: 'GET',
            });
        },




    }


});

angular.module('starter.services', [])

.factory('API', function ($rootScope, $http, $window, $ionicLoading, store, base) {

    //$rootScope.logout = function () {
    //    auth.signout();
    //    store.remove('profile');
    //    store.remove('token');
    //    store.remove('SourceID');
    //    $window.location.href = '#/app/landing';
    //};

    return {

        //  =====================================================
        //   ARTICLE
        //  =====================================================
        postArticle: function (article) {
            return $http.post(base + '/api/articles', article, {
                method: 'POST',
                withCredentials: true
            });
        },

        getArticle: function (id) {
            return $http.get(base + '/api/articles/' + id, {
                method: 'GET',
                withCredentials: true
            });
        },

        deleteArticle: function (id) {
            return $http.delete(base + '/api/articles/'+id, {
                method: 'DELETE',
                withCredentials: true
            });
        },

        publishArticle: function (id, boardID) {
            return $http.put(base + '/api/articles/' + id, {boardID:boardID}, {
                method: 'PUT',
                withCredentials: true
            });
        },

        //  =====================================================
        //   ARTICLES
        //  =====================================================

        getArticles: function () {
            return $http.get(base + '/api/articles', {
                method: 'GET',
                withCredentials: true
            });
        },

        getArticlesPaging: function (packageToSend) {
            return $http.post(base + '/api/articlespaging', packageToSend, {
                    method: 'POST',
                    withCredentials: true
            });
        },

        getTopArticles: function () {
            return $http.get(base + '/api/articles/top', {
                method: 'GET',
                withCredentials: true
            });
        },

        //  =====================================================
        //   ARTICLE LIKE SYSTEM
        //  =====================================================


        likeArticle: function (likedArticle) {
            return $http.post(base + '/api/articles/' + likedArticle.userID + '/likes', likedArticle, {
                method: 'POST',
                withCredentials: true
            });
        },

        putLikes: function (unlikedArticle) {
            return $http.put(base + '/api/articles/' + unlikedArticle.userID + '/likes', unlikedArticle, {
                method: 'PUT',
                withCredentials: true
            });
        },

        getLikers: function (id) {
            return $http.get(base + '/api/articles/' + id + '/likes', {
                method: 'GET',
                withCredentials: true
            });
        },


        //  =====================================================
        //   USER
        //  =====================================================

        //postUser: function (user) {
        //    return $http.post(base + '/api/users', user, {
        //        method: 'POST',
        //        withCredentials: true
        //    });
        //},

        getUser: function (id) {
            return $http.get(base + '/api/users/' + id, {
                method: 'GET',
                withCredentials: true
            });
        },

        putUser: function (user) {
            return $http.put(base + '/api/users/' + user.userID, user, {
                method: 'PUT',
                withCredentials: true
            });
        },

        getHomeFeed: function (homeFeedPacket) {
            return $http.post(base + '/api/users/' + homeFeedPacket.userID + '/homefeed', homeFeedPacket, {
                method: 'POST',
                withCredentials: true
            });
        },

        getHomeFeedPaging: function (homeFeedPacket) {
            return $http.post(base + '/api/users/homefeedpaging/' + homeFeedPacket.userID, homeFeedPacket, {
                method: 'POST',
                withCredentials: true
            });
        },

        createUserAuth: function (newUser) {
            // Creates a User in Auth0 Database
            return $http({
                method: 'POST',
                withCredentials: true,
                url: base + '/signup',
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

        getUsers: function (id) {
            return $http.get(base + '/api/users', {
                method: 'GET',
                withCredentials: true
            });
        },

        //  =====================================================
        //   AUTH
        //  =====================================================
        connect: function (username, password) {

            var url = base + '/api/users/connect';

            var data = {
                username: username,
                password: password
            };
            // Return the promise to the controller
            return $http({ withCredentials: true, method: 'POST', url: url, data: data });
        },

        signupUser: function (username, email, password) {
            var url = base + '/api/users/signup';
            //'&username=' + username +
            //'&email=' + email +
            //'&password=' + password;
            // Return the promise to the controller
            var data = {
                username: username,
                email: email,
                password: password
            };
            return $http({ withCredentials: true, method: 'POST', url: url, data: data });
        },

        registerFacebookUser: function (email, access_token, fb_id, name, picture_url) {

            return $http.post(base + '/api/users/fbsignup?email=' + email
                + '&access=' + access_token
                + '&fbId=' + fb_id
                + '&name=' + name, { picture_url: picture_url }, {
                    method: 'POST',
                    withCredentials: true
                });
        },

        registerTwitterUser: function (userName, userId, secret, token, pictureUrl) {
            return $http.post(base + '/api/users/twittersignup?userName=' + userName
                + '&userId=' + userId
                + '&secret=' + secret
                + '&token=' + token, { pictureUrl: pictureUrl }, {
                    method: 'POST',
                    withCredentials: true
                });
        },

        logoutUser: function () {
            var url = base + '/api/users/logout';

            // Return the promise to the controller
            return $http({ withCredentials: true, method: 'POST', url: url });
        },

        getAuth: function (id) {
            return $http.get(base + '/api/users/auth/' + id, {
                method: 'GET',
                withCredentials: true
            });
        },

        getUsersArticles: function (userID) {
            return $http.get(base + '/api/users/' + userID + '/articles', {
                method: 'GET',
                withCredentials: true
            });
        },

        getFollows: function (id) {
            return $http.get(base + '/api/users/' + id + '/follows', {
                method: 'GET',
                withCredentials: true
            });
        },
        getDetailBoard: function (id) {
            return $http.get(base + '/api/detailBoard/' + id, {
                method: 'GET',
                withCredentials: true
            });
        },

        getBoards: function (id) {
            return $http.get(base + '/api/boards/' + id, {
                method: 'GET',
                withCredentials: true
            });
        },

        postBoard: function (id, board) {
            return $http.post(base + '/api/boards/' + id, board, {
                method: 'POST',
                withCredentials: true
            });
        },

        followUser: function (id, user) {
            return $http.post(base + '/api/users/' + id + '/follows', user, {
                method: 'POST',
                withCredentials: true
            });
        },

        unfollowUser: function (id, user) {
            return $http.put(base + '/api/users/' + id + '/follows', user, {
                method: 'PUT',
                withCredentials: true
            });
        },

        getFollowers: function (id) {
            return $http.get(base + '/api/users/' + id + '/followers', {
                method: 'GET',
                withCredentials: true
            });
        },

        saveForLater: function (savedArticle) {
            return $http.post(base + '/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'POST',
                withCredentials: true
            });
        },

        getSaved: function (id) {
            return $http.get(base + '/api/users/' + id + '/saved', {
                method: 'GET',
                withCredentials: true
            });
        },

        deleteSaved: function (savedArticle) {
            return $http.put(base + '/api/users/' + savedArticle.userID + '/saved', savedArticle, {
                method: 'PUT',
                withCredentials: true
            });
        },

        //  =====================================================
        //   NOTIFICATIONS
        //  =====================================================

        getNotifications: function (userID) {
            return $http.get(base + '/api/users/' + userID + '/notifications', {
                method: 'GET',
                withCredentials: true
            });
        },
    };
});

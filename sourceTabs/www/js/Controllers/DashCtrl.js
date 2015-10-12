angular.module('starter.controllers')
.controller('DashCtrl', function ($scope, auth, store, $state) {
    $scope.logout = function () {
        auth.signout();
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        store.remove('SourceID');
        $state.go('landing', {}, { reload: true });
    };
});


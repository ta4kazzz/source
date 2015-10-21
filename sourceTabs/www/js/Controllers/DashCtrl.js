angular.module('starter.controllers')
.controller('DashCtrl', function ($scope, store, $state) {
    $scope.logout = function () {
        store.remove('token');
        store.remove('profile');
        store.remove('refreshToken');
        store.remove('SourceID');
        $state.go('landing', {}, { reload: true });
    };
});


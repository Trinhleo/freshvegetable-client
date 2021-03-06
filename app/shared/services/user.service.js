(function () {
    angular.module('app.services')
        .factory('UserService', UserService);

    UserService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function UserService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.baseApiUrl).concat("user");
        return {
            getMyUserInfo: getMyUserInfo,
            getUserInfo: getUserInfo,
            updateUserInfo: updateUserInfo,
            loadEventsByUserId: loadEventsByUserId
        };

        function getMyUserInfo() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/me').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getUserInfo(userId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + userId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateUserInfo(data) {
            var deferred = $q.defer();
            $http.put(apiUrl + '/me', data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function loadEventsByUserId(userId) {
            var deferred = $q.defer();
            $http.get(apiUrl + '/' + userId + '/events').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function addFollowUser(hostId, userId) {
            var defferred = $q.defer();
            $http.post(apiUrl + '/' + hostId + '/follow', userId).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;

        };
    }
})();
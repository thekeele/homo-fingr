'use strict';

angular.module('homoFingr').factory('FingerprintService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // return available functions for use in the controllers
    return ({
      postFingerprint: postFingerprint,
      getFingerprint: getFingerprint
    });

    function postFingerprint(fingerprint) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/fingers/api/fingers',
        {fingerprint: fingerprint})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject();
        });

      // return promise object
      return deferred.promise;
    }

    function getFingerprint(username) {
      return $http.get('/api/fingers/' + username);
    }
}]);

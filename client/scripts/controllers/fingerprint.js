angular.module('homoFingr').controller('FingerprintController',
  ['$scope', '$rootScope', '$location', 'AuthService', 'FingerprintService',
  function ($scope, $rootScope, $location, AuthService, FingerprintService) {

    var name = AuthService.getUsername();
    $scope.name = name;

    $scope.anonFP = function() {
      $scope.browser = $rootScope.browser;
      $scope.language = $rootScope.language;
      $scope.platform = $rootScope.platform;
      $scope.extensions = $rootScope.extensions;
    };

    var fp = new Fingerprint2();
    var d1 = new Date();

    fp.get(function(result, components) {
      var d2 = new Date();

      var fingerprint = {
        username: name,
        ip_address: userip,
        device_id: result,
        timestamp: d2,
        computation_time: d2 - d1,
        components: components
      };

      FingerprintService.postFingerprint(fingerprint);
      FingerprintService.getFingerprint(name).then(function(result) {
        $scope.fp = result.data;
      });
    });

}]);

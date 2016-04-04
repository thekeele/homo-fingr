angular.module('homoFingr').controller('FingerprintController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.getFP = function() {
      console.log('fingerprint controller userip', userip);

      console.log('fingerprint controller getUsername', AuthService.getUsername());

      new Fingerprint2().get(function(result, components){
        console.log(result); //a hash, representing your device fingerprint
        console.log(components); // an array of FP components
      });
    };

}]);

'use strict';

var homoFingr = angular.module('homoFingr', ['ngRoute']);

homoFingr.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/home.html',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/profile', {
      templateUrl: '../partials/profile.html',
      access: {restricted: true}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

homoFingr.run(function($rootScope, $location, $route, AuthService, FingerprintService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    console.log('next.access.restricted: ', next.access.restricted);
    console.log('AuthService.isLoggedIn(): ', AuthService.isLoggedIn());
    if (next.access.restricted && !AuthService.isLoggedIn()) {
      $location.path('/');
      $route.reload();
    }
  });

  var fp = new Fingerprint2();
  var d1 = new Date();
  var name = AuthService.getUsername();

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

    $rootScope.browser = fingerprint.components[0].value;
    $rootScope.language = fingerprint.components[1].value;
    $rootScope.platform = fingerprint.components[11].value;
    $rootScope.extensions = fingerprint.components[13].value;

    console.log('fingerprint: ', fingerprint);
    FingerprintService.postFingerprint(fingerprint);
  });
});

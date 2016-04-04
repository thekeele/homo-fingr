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
    .when('/register', {
      templateUrl: '../partials/register.html',
      controller: 'registerController',
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
    .when('/one', {
      template: '<h1>this is page one</h1>',
      access: {restricted: true}
    })
    .when('/two', {
      template: '<h1>this is page two</h1>',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});

homoFingr.run(function($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    // AuthService.getUserStatus();
    console.log('next.access.restricted: ', next.access.restricted);
    console.log('AuthService.isLoggedIn(): ', AuthService.isLoggedIn());
    if (next.access.restricted && !AuthService.isLoggedIn()) {
      $location.path('/');
      $route.reload();
    }
  });

  console.log('fingerprint controller userip', userip);
  console.log('fingerprint controller getUsername', AuthService.getUsername());
  new Fingerprint2().get(function(result, components){
    console.log(result); //a hash, representing your device fingerprint
    console.log(components); // an array of FP components
  });
});

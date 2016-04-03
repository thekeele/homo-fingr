var homoFingr = angular.module('homoFingr', ['ngRoute']);

homoFingr.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '../partials/home.html',
      access: {restricted: true}
    })
    .when('/login', {
      templateUrl: '../partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: '../partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
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
    AuthService.getUserStatus();
    if (next.access.restricted && !AuthService.isLoggedIn()) {
      $location.path('/login');
      $route.reload();
    }
  })
});

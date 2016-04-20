'use strict';

// Declare app level module which depends on views, and components
angular.module('pintamonas', [
  'ngRoute',
  'pintamonas.login',
  'pintamonas.painting',
  'pintamonas.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});

  $routeProvider.when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  });

  $routeProvider.when('/painting', {
    templateUrl: 'views/painting.html',
    controller: 'PaintingCtrl'
  });
}]);

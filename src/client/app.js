(function(){
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('pintamonas', [
    'ngRoute',
    'pintamonas.login',
    'pintamonas.painting',
    'pintamonas.blackboard'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    });

    $routeProvider.when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    });

    $routeProvider.when('/blackboard', {
      templateUrl: '../views/blackboard.html',
      controller: 'blackboardCtrl'
    });

    $routeProvider.when('/lobby', {
      templateUrl: '../views/lobby.html',
      controller: 'lobbyCtrl'
    });
  }]);

})();

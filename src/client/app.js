(function(){
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('pintamonas', [
    'ngRoute',
    'pintamonas.landing',
    'pintamonas.hub',
    'pintamonas.room'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    });

    $routeProvider.when('/room/:roomName', {
      templateUrl: '../views/room.html',
      controller: 'RoomCtrl'
    });

    $routeProvider.when('/hub', {
      templateUrl: '../views/hub.html',
      controller: 'HubCtrl'
    });
  }]);

})();

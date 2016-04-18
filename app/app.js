'use strict';

// Declare app level module which depends on views, and components
angular.module('pintamonas', [
  'ngRoute',
  'pintamonas.view1',
  'pintamonas.view2',
  'pintamonas.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

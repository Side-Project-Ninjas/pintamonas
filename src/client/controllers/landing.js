'use strict';

angular.module('pintamonas.landing', ['ngRoute'])
  .controller('LandingCtrl', landingCtrl);

/** @ngInject */
function landingCtrl($scope, $http, $location) {
  if (document.cookie.indexOf('pintamonas.user') !== -1) {
    $location.path( "/hub" );
  }
  var loginButton = angular.element('.login-button');
  loginButton.click(function() {
    $http({
      method: 'POST',
      url: '/api/name',
      data: {
        name: angular.element('#username').val()
      }
    }).then(function successCallback(response) {
      if (response.data.status === 'OK') {
        document.cookie = "pintamonas.user="+response.data.name;
        $location.path( "/hub" );
      }
    }, function errorCallback(response) {
      console.log("error", response);
    });
  });
}

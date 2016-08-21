(function() {
  'use strict';

  angular
    .module('pintamonas.hub', ['ngRoute'])
    .controller('HubCtrl', hubCtrl);

  /** @ngInject */
  function hubCtrl($scope, $http, $location, spnSocket) {

    spnSocket.getHubSocket($scope);
    var roomsMock = $scope.rooms = [];
    $scope.levelNames = ['Easy', 'Med', 'Hard'];
    $scope.joinToRoom = joinToRoom;

    var newRoom = angular.element('#newRoom');
    newRoom.click(function() {
      $scope.joinToRoom();
    });

    $http({
      method: 'GET',
      url: '/api/hub/rooms'
    }).then(function successCallback(response) {
      if (response.data.rooms && response.data.rooms.length) {
        roomsMock = response.data.rooms;
        $scope.rooms = roomsMock;
      }
      $scope.rooms = roomsMock;
    }, function errorCallback(response) {
      console.log(response);
    });

    function joinToRoom() {
      var opts = {
        method: 'POST',
        url: '/api/join'
      };
      $http(opts).then(function successCallback(response) {
        if (response.data.status === 'OK') {
          $location.path("/room/" + response.data.room);
        }
      }, function errorCallback(response) {
        console.log("error", response);
      });
    }

  }
})();

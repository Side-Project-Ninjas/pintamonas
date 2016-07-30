'use strict';

angular.module('pintamonas.hub', ['ngRoute'])
  .controller('HubCtrl', hubCtrl);

/** @ngInject */
function hubCtrl($scope, $http, $location) {
  $scope.levelNames = ['Easy', 'Med', 'Hard'];
  var roomsMock = [{
    name: 'name',
    maxUsers: 3,
    currentUsers: 0,
    level: 0
  }, {
    name: 'name1',
    maxUsers: 3,
    currentUsers: 0,
    level: 1
  }, {
    name: 'name2',
    maxUsers: 3,
    currentUsers: 0,
    level: 2
  }, {
    name: 'name3',
    maxUsers: 3,
    currentUsers: 0,
    level: 0
  }];

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
    $scope.rooms = roomsMock;
  });

  $scope.joinToRoom = function (name){
    var opts = {
      method: 'POST',
      url: '/api/join'
    };
    if (name) {
      opts.data = {name: name};
    }
    $http(opts).then(function successCallback(response) {
      if (response.data.status === 'OK') {
        $location.path("/room/" + response.data.room);
      }
    }, function errorCallback(response) {
      console.log("error", response);
    });
  }

  //connect to socketIO for room updates
  var socket = io('/hub');


  socket.on("connect", function() {
    console.log("CONNECTED TO " + socket.nsp);
  });
  socket.on("disconnect", function() {
    console.log("DISCONNECT FROM " + socket.nsp);
  });
  socket.on("user-say", function(payload) {
    console.log('new-room', payload);
    $scope.rooms.push({
      name: payload.name,
      maxUsers: payload.maxUsers,
      currentUsers: 1,
      level: payload.level
    });
    $scope.$apply();
  });
  socket.on('log', function(d) {
    console.log(d);
  });
}

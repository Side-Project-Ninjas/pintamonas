'use strict';

angular.module('pintamonas.room', ['ngRoute'])
  .controller('RoomCtrl', roomCtrl);

/** @ngInject */
function roomCtrl($scope) {
  $scope.chat = [{
    emitter: {
      name: 'SERVER',
      discriminator: 0
    },
    message: 'Welcome'
  }, {
    emitter: {
      name: 'SERVER',
      discriminator: 0
    },
    message: 'Welcome'
  }];

  $scope.users = [{
    name: 'ME',
    success: false
  }];

  var sendMessageButton = angular.element('.chat-send');
  var sendMessageTextBox = angular.element('#chat-input');

  sendMessageButton.click(function() {
    var payload = {
      message: sendMessageTextBox.val()
    };
    socket.emit('user-says', payload);
    sendMessageTextBox.val(null);
  });



  var socket = io('/room');

  socket.on("connect", function() {
    console.log("CONNECTED TO " + socket.nsp);
  });
  socket.on("disconnect", function() {
    console.log("DISCONNECT FROM " + socket.nsp);
  });
  socket.on("user-says", function(payload) {
    console.log('user-says', payload);
    $scope.chat.push({
      emitter: {
        name: payload.emmiter.name,
        discriminator: payload.emmiter.discriminator
      },
      message: payload.message
    });
    $scope.$apply();
  });
  socket.on("user-join", function(payload) {
    console.log('user-join', payload);
    $scope.chat.push({
      emitter: {
        name: 'SERVER',
        discriminator: 0
      },
      message: 'User '+payload.emitter.name+' joined'
    });
    $scope.users.push({
      name: payload.emitter.name,
      success: false
    });
    $scope.$apply();
  });
  socket.on('log', function(d) {
    console.log(d);
  });
}

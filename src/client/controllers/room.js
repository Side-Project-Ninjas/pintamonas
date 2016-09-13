'use strict';

angular.module('pintamonas.room', ['ngRoute'])
  .controller('RoomCtrl', roomCtrl);

/** @ngInject */
function roomCtrl($scope, spnSocket) {
  var socket = spnSocket.getRoomSocket($scope);

  $scope.chat = [];
  $scope.users = [];

  var sendMessageButton = angular.element('.chat-send');
  var sendMessageTextBox = angular.element('#chat-input');

  sendMessageButton.click(sendMessage);
  $scope.$on('socket:user-says', onUserSays);
  $scope.$on('socket:user-join', onUserJoin);
  $scope.$on('socket:log', onLog);

  function sendMessage() {
    var payload = {
      message: sendMessageTextBox.val()
    };
    socket.emit('user-says', payload);
    sendMessageTextBox.val(null);
  }

  function onUserSays(evt, payload) {
    console.log('user-says', payload);
    $scope.chat.push({
      emitter: {
        name: payload.emmiter.name,
        discriminator: payload.emmiter.discriminator
      },
      message: payload.message
    });
    $scope.$apply();
  }

  function onUserJoin(evt, payload) {
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
  }

  function onLog(d) {
    console.log(d);
  }
}

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

  // --- CÓDIGO DE CANVAS-TEST
  // TODO: Adaptar JADE
  $scope.clearArea = clearArea;
  var mousePressed = false;
  var lastX, lastY;
  var ctx;
  var positionArray = [];

  $interval(function() {
    if (positionArray.length > 0) {
      socket.emit("client:send-data", positionArray);
      positionArray = [];
    }
  }, 500); //TODO: Refinar intervalo para enviar el array de posiciones

  socket.on("server:send-data", function(data) {
    angular.forEach(data, function(position) {
      drawRemote(position[0], position[1], position[2], position[3]);
    });
  });

  initThis();

  function initThis() {
    ctx = document.getElementById('painting').getContext("2d");

    $('#painting').mousedown(function (e) {
      mousePressed = true;
      draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#painting').mousemove(function (e) {
      if (mousePressed) {
        draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      }
    });

    $('#painting').mouseup(function () {
      mousePressed = false;
    });
    $('#painting').mouseleave(function () {
      mousePressed = false;
    });
  }

  // Esta función se lanza cuando el cliente recibe por socket el array de posiciones
  //TODO: Unificar funciones drawRemote y draw
  function drawRemote(lastX, lastY, x, y) {
    ctx.beginPath();
    // ctx.strokeStyle = $('#selColor').val();
    // ctx.lineWidth = $('#selWidth').val();
    ctx.lineJoin = "round";
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
  }

  // Esta función se lanza cuando dibuja
  function draw(x, y, isDown) { //TODO: Evitar crear y cerrar paths por cada punto que se pinta
    if (isDown) {
      ctx.beginPath();
      // ctx.strokeStyle = $('#selColor').val();
      // ctx.lineWidth = $('#selWidth').val();
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
      positionArray.push([lastX, lastY, x, y]);
    }
    lastX = x; lastY = y;
  }

  function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  // --- TERMINA CÓDIGO DE CANVAS-TEST

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

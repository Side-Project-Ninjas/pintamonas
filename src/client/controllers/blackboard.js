(function(){
  'use strict';

  angular.module('pintamonas.blackboard', ['ngRoute'])

  .controller('BlackboardCtrl', ['$scope', '$interval', function($scope, $interval) {

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
      ctx.strokeStyle = $('#selColor').val();
      ctx.lineWidth = $('#selWidth').val();
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }

    // Esta función se lanza cuando dibuja
    function draw(x, y, isDown) { //TODO: Cambiarle el nombre a la variable
      if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
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

  }]);
})();

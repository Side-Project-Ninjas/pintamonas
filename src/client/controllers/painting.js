'use strict';

angular.module('pintamonas.painting', ['ngRoute'])

.controller('PaintingCtrl', ['$scope', function($scope) {

  $scope.clearArea = clearArea;
  var mousePressed = false;
  var lastX, lastY;
  var ctx;

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

  function draw(x, y, isDown) {
    if (isDown) {
      ctx.beginPath();
      ctx.strokeStyle = $('#selColor').val();
      ctx.lineWidth = $('#selWidth').val();
      ctx.lineJoin = "round";
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.stroke();
    }
    lastX = x; lastY = y;
    //TODO: Enviar datos por Socket.io para sincronizar canvas
  }

  function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

}]);

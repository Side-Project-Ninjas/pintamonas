(function() {
  'use strict';

  angular
    .module('spn')
    .directive('spnPainting', directive);

  /** @ngInject */
  function directive($interval, spnSocket) {
    var directive = {
      restrict: 'E',
      scope: {
        rooms: '='
      },
      templateUrl: './components/painting/template.html',
      compile: compileFunc
    };

    return directive;

    function compileFunc() {

      return {
        pre: linkFunc,
        post: angular.noop
      };
    }

    function linkFunc(scope, el) {
      var socket = spnSocket.getConnectedSocket();

      // La directiva se debe encargar de:
      // - Recibir los eventos de pintar
      // - Pintar
      // - Guardar los datos en el servicio

      // El servicio se debe encargar de:
      // - Enviar al servidor los datos que tiene almacenados
      // - Almacenar los datos que le envía la directiva

      // --- CÓDIGO DE CANVAS-TEST
      // TODO: Adaptar JADE
      scope.clearArea = clearArea;
      var lastX, lastY;
      var ctx;
      var positionArray = [];

      var canvas = el.find('#painting');
      var context = canvas.getContext('2d');
      var mousePressed = false;

      // TODO: Normalizar la posición del dibujo
      // var width   = window.innerWidth;
      // var height  = window.innerHeight;
      // canvas.width = width;
      // canvas.height = height;

      // Bindea eventos al canvas
      // Cuando se presiona el click
      canvas.bind('mousedown', canvasMousedown);
      // Cuando se mueve el ratón
      canvas.bind('mousemove', canvasMousemove);
      // Cuando se levanta el click
      canvas.bind('mouseup', canvasMouseup);
      // Cuando se saca el ratón del canvas
      canvas.bind('mouseleave', canvasMouseleave);

      // Función que se ejecuta cuando se pulsa el click
      function canvasMousedown() {
        mousePressed = true;
        context.beginPath();
      }

      // Función que se ejecuta cuando se mueve el ratón
      function canvasMousemove(e) {
        if (mousePressed) {
          // mousePosition.x = e.clientX / width;
          // mousePosition.y = e.clientY / height;

        }
      }

      // Función que se ejecuta cuando se suelta el click
      // TODO: Si no hay ninguna diferencia con mouseleave, evitar duplicidad
      function canvasMouseup() {
        mousePressed = false;
        context.closePath();
        context.stroke();
      }

      // Función que se ejecuta cuando se saca el ratón del canvas
      // TODO: Si no hay ninguna diferencia con mouseup, evitar duplicidad
      function canvasMouseleave() {
        mousePressed = false;
        context.closePath();
        context.stroke();
      }

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
    }
  }
})();

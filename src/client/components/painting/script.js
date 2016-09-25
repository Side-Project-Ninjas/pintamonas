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
      // scope.clearArea = clearArea;
      var lastX, lastY;
      var ctx;
      var positionArray = [];

      var canvas = el.find('#painting')[0];
      var context = canvas.getContext('2d');
      // context.strokeStyle = $('#selColor').val();
      // context.lineWidth = $('#selWidth').val();
      context.lineJoin = "round";

      var mouse = {
        pressed: false,
        moving: false,
        pos: {x: 0, y: 0},
        pos_prev: false
      };

      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

      // TODO: Normalizar la posición del dibujo
      // var width   = window.innerWidth;
      // var height  = window.innerHeight;
      // canvas.width = width;
      // canvas.height = height;
      // Se ajusta la altura y anchura del canvas
      // TODO: Ajustarlo al espacio que tiene
      canvas.width = 1200;
      canvas.height = 700;

      var lineArray = [];
      var line = [];


      // Bindea eventos al canvas
      // Cuando se presiona el click
      el.find(canvas).bind('mousedown', canvasMousedown);
      // Cuando se mueve el ratón
      el.find(canvas).bind('mousemove', canvasMousemove);
      // Cuando se levanta el click
      el.find(canvas).bind('mouseup', canvasMouseup);
      // Cuando se saca el ratón del canvas
      el.find(canvas).bind('mouseleave', canvasMouseup);

      mainLoop();

      function mainLoop() {
        if (mouse.pressed && mouse.moving && line.length > 0) {
          // socket.emit('draw-line', line);
          draw(line);
          mouse.moving = false;
        }
        requestAnimationFrame(mainLoop);
      }

      socket.on('draw-line', draw);

      function draw(data) {
        var i, dot;
        for (i = 0; i < data.length; i++) {
          dot = data[i];

          context.moveTo(dot.x, dot.y);
          if (i !== 0) {
            dot = data[i - 1];
          }
          context.lineTo(dot.x, dot.y);
        }
        context.stroke();

        data[0] = data[data.length - 1];
        data.length = 1;

      }

      // Función que se ejecuta cuando se pulsa el click
      function canvasMousedown() {
        mouse.pressed = true;
        context.beginPath();
      }

      // Función que se ejecuta cuando se mueve el ratón
      function canvasMousemove(e) {
        if (mouse.pressed) {
          // mousePosition.x = e.clientX / width;
          // mousePosition.y = e.clientY / height;
          mouse.moving = true;
          line.push({
            x: e.offsetX,
            y: e.offsetY
          });
        }
      }

      // Función que se ejecuta cuando se suelta el click
      // TODO: Si no hay ninguna diferencia con mouseleave, evitar duplicidad
      // TODO: Controlar que haya un path creado antes de intentar cerrarlo
      function canvasMouseup() {
        // lineArray.push(line);

        // Se dibuja la línea
        line = [];
        mouse.pressed = false;
        context.closePath();
        context.stroke();
      }

      function oldDraw(x, y, isDown) { //TODO: Evitar crear y cerrar paths por cada punto que se pinta
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

      // Función que se ejecuta cuando se saca el ratón del canvas
      // TODO: Si no hay ninguna diferencia con mouseup, evitar duplicidad
      // TODO: Controlar que haya un path creado antes de intentar cerrarlo
      function canvasMouseleave() {
        lineArray.push(line);

        // Se dibuja la línea
        draw(line);
        line = [];
        mousePressed = false;
        context.closePath();
        context.stroke();
      }

      // $interval(function() {
      //   if (positionArray.length > 0) {
      //     socket.emit("client:send-data", positionArray);
      //     positionArray = [];
      //   }
      // }, 500); //TODO: Refinar intervalo para enviar el array de posiciones
      //
      // socket.on("server:send-data", function(data) {
      //   angular.forEach(data, function(position) {
      //     drawRemote(position[0], position[1], position[2], position[3]);
      //   });
      // });

      // initThis();

      // function initThis() {
      //
      //   $('#painting').mousedown(function (e) {
      //     mousePressed = true;
      //     draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
      //   });
      //
      //   $('#painting').mousemove(function (e) {
      //     if (mousePressed) {
      //       draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
      //     }
      //   });
      //
      //   $('#painting').mouseup(function () {
      //     mousePressed = false;
      //   });
      //   $('#painting').mouseleave(function () {
      //     mousePressed = false;
      //   });
      // }

      // Esta función se lanza cuando el cliente recibe por socket el array de posiciones
      //TODO: Unificar funciones drawRemote y draw
      // function drawRemote(lastX, lastY, x, y) {
      //   ctx.beginPath();
      //   // ctx.strokeStyle = $('#selColor').val();
      //   // ctx.lineWidth = $('#selWidth').val();
      //   ctx.lineJoin = "round";
      //   ctx.moveTo(lastX, lastY);
      //   ctx.lineTo(x, y);
      //   ctx.closePath();
      //   ctx.stroke();
      // }

      // Esta función se lanza cuando dibuja
      // function draw(x, y, isDown) { //TODO: Evitar crear y cerrar paths por cada punto que se pinta
      //   if (isDown) {
      //     ctx.beginPath();
      //     // ctx.strokeStyle = $('#selColor').val();
      //     // ctx.lineWidth = $('#selWidth').val();
      //     ctx.lineJoin = "round";
      //     ctx.moveTo(lastX, lastY);
      //     ctx.lineTo(x, y);
      //     ctx.closePath();
      //     ctx.stroke();
      //     positionArray.push([lastX, lastY, x, y]);
      //   }
      //   lastX = x; lastY = y;
      // }

      // function clearArea() {
      //   ctx.setTransform(1, 0, 0, 1, 0, 0);
      //   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // }

      // --- TERMINA CÓDIGO DE CANVAS-TEST
    }
  }
})();

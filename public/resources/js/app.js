(function(){
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('pintamonas', [
    'ngRoute',
    'pintamonas.landing',
    'pintamonas.blackboard'
  ]).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});

    $routeProvider.when('/', {
      templateUrl: 'views/landing.html',
      controller: 'LandingCtrl'
    });

    $routeProvider.when('/blackboard', {
      templateUrl: '../views/blackboard.html',
      controller: 'BlackboardCtrl'
    });
  }]);

})();

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
    }, 500);

    socket.on("server:send-data", function(data) {
      console.log(data);
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

    function draw(x, y, isDown, aux) { //TODO: Cambiarle el nombre a la variable
      if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
        if (typeof aux === "undefined") {
          positionArray.push([lastX, lastY, x, y]); //Array a enviar en el evento del socket
        }
      }
      lastX = x; lastY = y;
      //TODO: Enviar datos por Socket.io para sincronizar canvas
    }

    function clearArea() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

  }]);
})();

(function(){
  'use strict';

  angular.module('pintamonas.landing', ['ngRoute'])

  .controller('LandingCtrl', [function() {

  }]);
})();

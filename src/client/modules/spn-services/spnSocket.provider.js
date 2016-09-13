/* global io*/
(function() {
  'use strict';

  angular
    .module('spn')
    .factory('spnSocket', service);

  /** @ngInject */
  function service($rootScope, socketFactory) {

    var evts = ['connect', 'disconnect', 'new-room', 'room-update','user-say', 'user-says', 'user-join', 'user-leave', 'log'];
    var connectedSocket;
    var service = {
      getHubSocket: function(scope) {
        return createConnection('/hub', scope);
      },
      getRoomSocket: function(scope) {
        return createConnection('/room', scope);
      },
      getConnectedSocket: getConnectedSocket
    };

    // NOTE: Quizá sólo haga falta guardar un socket, ya que sólo se va a estar en un estado

    function getConnectedSocket() {
      return connectedSocket;
    }

    function createConnection(path, scope) {
      // TODO: Guardar aquí el socket en la variable para poder acceder directamente desde las directivas
      var myIoSocket = io.connect(path);
      var mySocket = socketFactory({
        ioSocket: myIoSocket
      });
      mySocket.forward(evts);

      angular.forEach(evts, function(evt){
        scope.$on('socket:'+evt, function(ev, data) {
          console.log(evt, data);
        });
      });

      scope.$on('$destroy', function(){
        console.log('Destroying socket');
        mySocket.disconnect();
      });

      connectedSocket = mySocket;

      return mySocket;
    }
    return service;

  }
})();

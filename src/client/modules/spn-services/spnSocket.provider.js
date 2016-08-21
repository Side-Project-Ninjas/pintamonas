/* global io*/
(function() {
  'use strict';

  angular
    .module('spn')
    .factory('spnSocket', service);

  /** @ngInject */
  function service($rootScope, socketFactory) {

    var evts = ['connect', 'disconnect', 'new-room', 'room-update','user-say', 'user-says', 'user-join', 'user-leave', 'log'];
    var service = {
      getHubSocket: function(scope) {
        return createConnection('/hub', scope);
      },
      getRoomSocket: function(scope) {
        return createConnection('/room', scope);
      }
    };

    function createConnection(path, scope) {
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

      return mySocket;
    }
    return service;

  }
})();

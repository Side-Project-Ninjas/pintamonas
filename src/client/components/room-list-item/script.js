(function() {
  'use strict';

  angular
    .module('spn')
    .directive('spnRoomListItem', directive);

  /** @ngInject */
  function directive($http, $location) {
    var directive = {
      restrict: 'E',
      scope: {
        room: '='
      },
      templateUrl: './components/room-list-item/template.html',
      compile: compileFunc
    };

    return directive;

    function compileFunc(el) {

      return {
        pre: linkFunc,
        post: angular.noop
      };
    }

    function linkFunc(scope, el, attr) {
      scope.levelNames = ['Easy', 'Med', 'Hard'];
      scope.$on('socket:room-update', onRoomUpdate);

      scope.joinRoom = joinRoom;

      function onRoomUpdate(ev, payload) {
        if (payload.name === scope.room.name) {
          scope.room = payload;
          scope.$apply();
        }
      }

      function joinRoom() {
        var opts = {
          method: 'POST',
          url: '/api/join',
          data: {
            name: scope.room.name
          }
        };
        $http(opts).then(function successCallback(response) {
          if (response.data.status === 'OK') {
            $location.path("/room/" + response.data.room);
          }
        }, function errorCallback(response) {
          console.log("error", response);
        });
      }
    }
  }
})();

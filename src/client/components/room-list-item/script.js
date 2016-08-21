(function() {
  'use strict';

  angular
    .module('spn')
    .directive('spnRoomListItem', directive);

  /** @ngInject */
  function directive() {
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
      scope.log = function(){console.log(scope);};
      function onRoomUpdate(ev, payload) {
        if (payload.name === scope.room.name) {
          scope.room = payload;
          scope.$apply();
        }
      }
    }
  }
})();

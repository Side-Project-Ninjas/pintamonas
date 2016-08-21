(function() {
  'use strict';

  angular
    .module('spn')
    .directive('spnRoomList', directive);

  /** @ngInject */
  function directive(spnSocket) {
    var directive = {
      restrict: 'E',
      scope: {
        rooms: '='
      },
      templateUrl: './components/room-list/template.html',
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
      scope.rooms = attr.rooms || [];
      scope.$watch('rooms', function(a,b){console.log(a,b);})
      scope.log = function(){console.log(scope);};
      scope.$on('socket:new-room', onRoomAdd);

      function onRoomAdd(ev, payload) {
        console.log(payload);
        scope.rooms.push(payload);
      }
    }
  }
})();

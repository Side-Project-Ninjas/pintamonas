(function() {
  'use strict';

  angular
    .module('spn', ['btford.socket-io'])
    .config(config);

  /** @ngInject */
  function config(spnHttpProvider) {

    spnHttpProvider.setApiAlias({
      name: {
        method: "POST",
        url: "/api/name"
      },
      rooms: {
        method: "GET",
        url: "/api/hub/rooms"
      },
      joinRoom: {
        method: "POST",
        url: "/api/join"
      }
    });

  }
})();

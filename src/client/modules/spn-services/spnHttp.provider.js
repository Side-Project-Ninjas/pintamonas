(function() {
  'use strict';

  angular
    .module('spn')
    .provider('spnHttp', service);

  /** @ngInject */
  function service() {

    var aliases = {};
    var defaultAlias = {
      url: '/unknown',
      method: 'GET'
    };

    var provider = {
      setApiAlias: setApiAlias,
      aliases:aliases,
      $get: ['$http', function($http) {
        return {
          httpAlias: function(aliasString, payload) {
            var alias = aliases[aliasString] || defaultAlias;
            var url = alias.url;
            var method = alias.method;

            if (method === "GET") {
              return $http.get(url);
            } else if (method === "POST") {
              return $http.post(url, payload);
            }
          }
        };
      }]
    };

    return provider;

    /* Config Factory*/
    function setApiAlias(configUrls) {
      aliases = configUrls;
    }

  }
})();

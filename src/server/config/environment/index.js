'use strict';

var path = require('path');

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.resolve('.'),

    // Server port
    port: process.env.PORT || 3000,

    // Server IP
    ip: process.env.IP || '127.0.0.1'
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign({},
    all,
    require('./shared'),
    require('./{0}.js'.format(requiredProcessEnv('NODE_ENV'))) || {}
);

/**
 * Production environment configuration
 */
'use strict';

var path = require('path');

// Export prod conf
// ================
module.exports = {
    // Server port
    port: process.env.PORT ||
          8080,

    // Public path
    publicPath: path.normalize(__dirname + '/../../../public')

};

/**
 * Express configuration
 */
'use strict';

var express = require('express');
var config = require('./environment');

// Set the express config up
// =========================
module.exports = function(app) {
    app.use(express.static(__dirname + config.publicPath));
};

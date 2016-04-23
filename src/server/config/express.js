/**
 * Express configuration
 */
'use strict';

var express = require('express');
var path = require('path');
var config = require('./environment');

// Set the express config up
// =========================
module.exports = function(app) {
    app.use(express.static(path.resolve(config.publicPath)));
};

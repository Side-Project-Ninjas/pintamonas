/**
 * Express configuration
 */
"use strict";

var express = require("express");
var path = require("path");
var config = require("./environment");
var api = require("./api");

// Set the express config up
// =========================
module.exports = function(app) {
    //routes config
    app.use(express.static(path.resolve(config.publicPath)));

    app.use("/api", api);
};

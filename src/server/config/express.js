/**
 * Express configuration
 */
"use strict";

var express = require("express");
var path = require("path");
var config = require("./environment");
var api = require("./api");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var globalMiddlewares = require('./middlewares/global.js');


// Set the express config up
// =========================
module.exports = function(app, session) {
    //routes config

    app.set("json replacer", function(key, val) {
        if (key[0] === "_") {
            return undefined;
        }
        return val;
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser("secret"));
    app.use(session);

    globalMiddlewares(app);

    app.use(express.static(path.resolve(config.publicPath)));

    app.use("/api", api);
};

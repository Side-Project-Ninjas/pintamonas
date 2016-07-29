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
var User = require("../lib/models/User");

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

    app.use(function createNewUserId(req, res, next) {
        if (req.session && !req.session.userId) {
            req.session.userId = (new User()).getId();
            req.session.save();
        }
        next();
    });

    app.use(function rejectIfNotUserName(req, res, next) {
        var user;
        if (req.session && req.session.userId) {
            user = User.getUserById(req.session.userId);
            if (!user.getName()) {
                res.status(401).json({
                    status: "Full user config is neccessary"
                }).end();
            }
        }
        next();
    });

    app.use(express.static(path.resolve(config.publicPath)));

    app.use("/api", api);
};

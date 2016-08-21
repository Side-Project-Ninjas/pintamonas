/**
 * Express API configuration
 */
"use strict";

var express = require("express");
var User = require("../lib/models/User");
var Room = require("../lib/models/Room");
var apiMiddleware = require("./middlewares/api");
var router = new express.Router();

// Set the API routes
// ==================

router.get("/", function(req, res) {
    res.send("Pintamonas API");
});

router.get("/version", function(req, res) {
    res.json({
        version: "0.0.0"
    });
});

router.post("/name", function(req, res, next) {
    var response, user = User.getUserById(req.session.userId);
    if (!user.getName()) {
        user.setName(req.body.name);
        response = {
            status: "OK",
            name: user.getName(),
            discriminator: user.getDiscriminator()
        };
    } else {
        return next(new Error("Name already set"));
    }
    res.json(response);
});

apiMiddleware(router);

router.get("/hub/rooms", function(req, res) {
    var response = Room.getRoomsAsObject();
    res.json(response);
});

router.post("/join", function(req, res) {
    var room, user = User.getUserById(req.session.userId);
    req.session.room = req.body.name;
    if (!req.body.name) {
        room = new Room();
        req.session.room = room.getName();
    } else {
        room = Room.getRoom(req.body.name);
        room.addUser(user);
    }
    var response = {
        status: "OK",
        room: req.session.room
    };
    res.json(response);
});

module.exports = router;

/**
 * Express API configuration
 */
"use strict";

var express = require("express");
var rooms = require("../lib/rooms");
var User = require("../lib/models/User");
var Room = require("../lib/models/Room");
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

router.post("/name", function(req, res) {
    var user = User.getUserById(req.session.userId);
    user.setName(req.body.name);
    var response = {
        status: "OK",
        name: user.getName(),
        discriminator: user.getDiscriminator()
    };

    res.json(response);
});

router.get("/hub/rooms", function(req, res) {
    var response = Room.getRoomsAsObject();
    res.json(response);
});

router.post("/join", function(req, res) {
    req.session.room = req.body.name;
    if (!req.body.name) {
        req.session.room = (new Room()).getName();
    }
    var response = {
        status: "OK",
        room: req.session.room
    };
    res.json(response);
});


module.exports = router;

/**
 * Express API configuration
 */
"use strict";

var express = require("express");
var rooms = require("../lib/rooms");
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

router.get("/rooms", function(req, res) {
    var r = {
        rooms: rooms.getRoomList()
    };
    res.json(r);
});


module.exports = router;

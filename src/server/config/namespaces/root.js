"use strict";

var Room = require("../../lib/models/Room");
var User = require("../../lib/models/User");


// Set the SocketIO config up
// ==========================
module.exports = function(socketio) {
    socketio.on("connection", function(socket) {
        socket.on("test", function() {
            socket.log("TEST ON ROOT".red);
            socket.emit("log", "TEST ON ROOT");
        });
    });
};

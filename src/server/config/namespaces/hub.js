"use strict";

var Room = require("../../lib/models/Room");

// Set the SocketIO config up
// ==========================
module.exports = function(nsp) {
    Room.hubSocket = nsp;
    nsp.on("connection", function(client) {
        client.on("test", function() {
            client.log("TEST ON ROOMS".red);
            nsp.emit("log", "TEST ON ROOMS " + client.handshake.session.userId);
        });
    });
};

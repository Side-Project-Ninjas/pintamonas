/**
 * Socket.io configuration
 */
"use strict";

// var rooms = require("../lib/rooms");
var Room = require("../lib/models/Room");
var User = require("../lib/models/User");


// Set the SocketIO config up
// ==========================
module.exports = function(socketio, session) {
    var sharedsession = require("express-socket.io-session");
    var root = socketio.of("/");
    var hub = socketio.of("/hub");
    var room = socketio.of("/room");
    root.use(sharedsession(session, {
        autoSave: true
    }));
    hub.use(sharedsession(session, {
        autoSave: true
    }));
    room.use(sharedsession(session, {
        autoSave: true
    }));
    var SocketNamespace = require("../lib/models/SocketNamespace");

    var rootNsp = new SocketNamespace("/", root, onConnect);
    var roomsNsp = new SocketNamespace("/hub", hub, onConnect);
    var blackboardNsp = new SocketNamespace("/room", room, onConnect);

    // Setup the namespaces config
    require("./namespaces/root")(root);
    require("./namespaces/hub")(hub);
    require("./namespaces/room")(room);

    function onConnect(client, data) {
        client.custom = {};
        // Save address
        client.custom.address = client.request.connection.remoteAddress +
            ":" + client.request.connection.remotePort;

        // Save connection timestamp
        client.custom.connectedAt = new Date();

        // Save user object
        if (!client.handshake.session || (client.handshake.session && !client.handshake.session.userId)) {
            // client.emit("error", {error: "session not found"});
            client.disconnect();
            return;
        }

        client.getUser = function() {
            if (client.handshake.session && client.handshake.session.userId) {
                return User.getUserById(client.handshake.session.userId);
            }
        };

        client.getRoom = function() {
            if (client.handshake.session && client.handshake.session.room) {
                return Room.getRoom(client.handshake.session.room);
            }
        };

        var user = client.getUser();

        user.setSocket(client);

        // Define log method
        client.log = function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift("{0} {1} [{2}]".format("[SocketIO]".green, client.nsp.name, client.custom.address));
            console.log.apply(console, args);
        };

        // Call onDisconnect
        client.on("disconnect", function() {
            client.log("USER DISCONNECTED".red);
            var room, user = client.getUser();
            if (user) {
                room = user.getRoom();
                if (room) {
                    room.removeUser(user.getFullName());
                }
            }
        });

        client.log("USER CONNECTED".blue);
    }
};

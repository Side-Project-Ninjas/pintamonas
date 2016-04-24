/**
 * Socket.io configuration
 */
"use strict";

var rooms = require("../lib/rooms");

// When the user disconnects
function onDisconnect(socket) {
    rooms.removeUserFromRoom(socket.username, socket.room);
    socket.broadcast.to(socket.room).emit("server:update-chat", "SERVER", socket.username + " has leaved this room");
}

// When the user connects
function onConnect(socket) {
    // When the client emits "info", this listens and executes
    socket.on("client:info", function(data) {
        socket.log(JSON.stringify(data, null, 2));
    });

    socket.on("client:join-room", function(username, roomname) {
        var room = rooms.addUserToRoom(username, roomname);
        // store the name for this client
        socket.username = username;
        // store the room name in the socket session for this client
        socket.room = roomname;
        // send client to room 1
        socket.join(roomname);
        var type = "SERVER";
        // echo to client they"ve connected
        socket.emit("server:update-chat", type, "you have connected to room1", {
            users: room
        });
        // echo to room 1 that a person has connected to their room
        socket.broadcast.to(roomname).emit("server:update-chat", type, username + " has connected to this room");
        //socket.emit("updaterooms", rooms, "room1");
        socket.log("USER '{0}' CONNECTED TO ROOM '{1}'".format(username, roomname));
    });
}

function onGetRooms(socket) {
    socket.on("client:get-rooms", function() {
        socket.emit("server:get-rooms", {
            rooms: rooms.getRoomList()
        });
    });
}

function onUpdateChat(socket) {
    socket.on("client:update-chat", function(message) {
        socket.broadcast.emit("server:update-chat", message);
    });
}

function onPing(socket) {
    socket.on("client:ping", function() {
        socket.emit("server:pong", "PONG!");
    });
}

// Set the SocketIO config up
// ==========================
module.exports = function(socketio) {
    socketio.on("connection", function(socket) {
        // Save address
        socket.address = socket.request.connection.remoteAddress +
            ":" + socket.request.connection.remotePort;

        // Save connection timestamp
        socket.connectedAt = new Date();

        // Define log method
        socket.log = function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift("{0} {1} [{2}]".format("[SocketIO]".green, socket.nsp.name, socket.address));
            console.log.apply(console, args);
        };

        // Call onDisconnect
        socket.on("disconnect", function() {
            onDisconnect(socket);
            socket.log("USER DISCONNECTED".red);
        });

        // Call onX functions
        onConnect(socket);
        onGetRooms(socket);
        onUpdateChat(socket);
        onPing(socket);
        socket.log("USER CONNECTED".blue);
    });
};

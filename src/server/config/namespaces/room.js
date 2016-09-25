"use strict";

var Room = require("../../lib/models/Room");

// Set the ROOM namespace config up
// ==========================
module.exports = function(nsp) {
    nsp.on("connection", function(client) {
        var room = client.getRoom();
        var roomname = room.getName();
        room.setSocket(nsp.to(roomname));
        client.join(roomname);
        room.addUser(client.getUser());
        client.emit("log", "Joined to room " + roomname);
        client.on("test", function() {
            client.log("TEST ON BLACKBOARD".red);
            nsp.to(roomname).emit("log", "TEST ON ROOM " + roomname + " " + client.handshake.session.userId);
        });

        client.on("user-says", function(payload) {
            /*
            var payload = {
                emitter: {
                    name:'',
                    discriminator:''
                },
                message: ''
            }
             */
            payload.emmiter = {
                name: client.getUser().getName(),
                discriminator: client.getUser().getDiscriminator()
            };
            client.broadcast.to(roomname).emit("user-says", payload);
        });

        client.on("draw-line", function(line) {
            console.log("Broadcasting line to draw");
            client.broadcast.to(roomname).emit("draw-line", line);
        });

        client.on("join-room", function(roomname) {
            var room;
            if (roomname) {
                room = Room.getRoom(roomname);
                if (!room) {
                    room = new Room();
                }
            } else {
                room = new Room();
            }
            client.join(room.getName());
        });
    });
};

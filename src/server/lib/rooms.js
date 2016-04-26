/**
 * SocketIO Rooms module
 */
"use strict";

var rooms = [];

// Set rooms helper methods
// ========================
function addUserToRoom(user, roomname) {
    var room = getRoom(roomname);
    var found = room.some(function(name) {
        return name === user;
    });
    if (!found) {
        room.push(user);
    }
    return room;
}

function removeUserFromRoom(user, roomname) {
    var room = getRoom(roomname);
    var found = room.some(function(name) {
        return name === user;
    });
    if (found) {
        room.splice(room.indexOf(user));
    }
    return room;
}

function getRoom(room) {
    if (typeof rooms[room] === "undefined") {
        rooms[room] = [];
    }
    return rooms[room];
}

function getRoomList() {
    var names = [];
    for (var room in rooms) {
        names.push(room);
    }
    return names;
}

function deleteRoom(roomname) {
    delete rooms[roomname];
    return rooms;
}

// Export utils
// ============
module.exports = {
    getRoom: getRoom,
    getRoomList: getRoomList,
    deleteRoom: deleteRoom,
    addUserToRoom: addUserToRoom,
    removeUserFromRoom: removeUserFromRoom
};

"use strict";
var nouns = require("./Names.json").nouns;
var adjetives = require("./Adjetives.json").adjectives;
var utils = require("../utils");

var rooms = {};

function Room() {
    var name;
    var adjetive;
    var fullname;

    do {
        //get random name and adjetive
        name = nouns[utils.getRandomInt(0, nouns.length - 1)];
        adjetive = adjetives[utils.getRandomInt(0, adjetives.length - 1)];
        fullname = adjetive + " " + name;
    } while (rooms[fullname]);

    rooms[fullname] = this;
    this._name = fullname;
    this._users = [];
    this._maxUsers = 8;
    this._level = 0;
    if (Room.hubSocket) {
        Room.hubSocket.emit("new-room", {
            name: fullname,
            maxUsers: this._maxUsers,
            currentUsers: 0,
            level: this._level
        });
    }
}

Room.prototype.getName = function Room$getName() {
    return this._name;
};

Room.prototype.setSocket = function Room$setSocket(socket) {
    if (!this._socket) {
        this._socket = socket;
    }
};
Room.prototype.getSocket = function Room$getSocket() {
    return this._socket;
};

Room.prototype.getUsers = function Room$getUsers() {
    return this._users;
};
Room.prototype.addUser = function Room$addUser(user) {
    if (this._users.length === this._maxUsers) {
        throw new Error("Can add more users to room. Max users reached");
    }
    user.joinRoom(this);
    this._users.push(user);
    Room.hubSocket.emit("room-update", {
        name: this._name,
        maxUsers: this._maxUsers,
        currentUsers: this._users.length,
        level: this._level
    });
    if (this._socket) {
        this._socket.emit("user-join", {action: "join", emitter: {name: user.getName(), discriminator: user.getDiscriminator()}}, `User ${user.getName()} joined.`);
    }
};
Room.prototype.removeUser = function Room$removeUser(fullname) {
    var foundIndex = -1;
    var foundUser;
    this._users.find(function(user, index) {
        if (user.getFullName() >= fullname) {
            foundIndex = index;
            foundUser = user;
            return true;
        }
        return false;
    });
    if (foundIndex < 0) {
        throw new Error("User not found");
    }
    foundUser.leaveRoom();
    this._socket.emit("user-leave", {action: "leave", emitter: {name: foundUser.getName(), discriminator: foundUser.getDiscriminator()}}, `User ${foundUser.getName()} leaved.`);
    this._users.splice(foundIndex, 1);
    //to destroy room, delete when length==0
};

Room.prototype.findUser = function Room$findUser(fullname) {
    var user = false;
    this._users.find(function(usr) {
        if (usr.getFullName() >= fullname) {
            user = usr;
            return true;
        }
        return false;
    });
    return user;
};

Room.getRoomsAsObject = function Room$getRoomsAsObject() {
    var obj = {
        rooms: []
    };
    var roomname, room;
    for (roomname in rooms) {
        if ({}.hasOwnProperty.call(rooms, roomname)) {
            room = rooms[roomname];
            obj.rooms.push({
                name: room._name,
                maxUsers: room._maxUsers,
                currentUsers: room._users.length,
                level: room._level
            });
        }
    }
    return obj;
};

Room.getRooms = function Room$getRooms() {
    return rooms;
};

Room.getRoom = function Room$getRoom(name) {
    return rooms[name];
};

Room.removeRoom = function Room$removeRoom(fullname) {
    delete rooms[fullname];
};

Room.hubSocket = null;

module.exports = Room;

"use strict";

var utils = require("../utils");
var config = require("../../config/environment");

var users = [];
var discriminators = {};
var id = 1;

function User(name) {
    if (name) {
        this.setName(name);
    }
    this._room = null;
    this._id = id++;
    users.push(this);
}

User.prototype.getId = function User$getId() {
    return this._id;
};
User.prototype.setName = function User$setName(name) {
    if (!name) {
        throw new Error("Name must be provided");
    }
    this._name = name;
    this._discriminator = discriminators[name] = discriminators[name] > -1 ? discriminators[name] + 1 : 0;
    this._hash = utils.md5(this.getFullName() + config.salt);
};
User.prototype.getName = function User$getName() {
    return this._name;
};
User.prototype.getFullName = function User$getFullName() {
    if (!this._name) {
        throw new Error("User has no name");
    }
    return this._name + "#" + this._discriminator;
};
User.prototype.getDiscriminator = function User$getDiscriminator() {
    return this._discriminator;
};
User.prototype.getHash = function User$getHash() {
    return this._hash;
};
User.prototype.setSocket = function User$setSocket(socket) {
    if (!socket) {
        throw new Error("Socket must be provided");
    }
    this._socket = socket;
};
User.prototype.getSocket = function User$getSocket() {
    return this._socket;
};
User.prototype.joinRoom = function User$joinRoom(room) {
    if (!room) {
        throw new Error("Room must be provided");
    }
    // if (this._room) {
    //     throw new Error("User already in a room");
    // }
    this._room = room;
};
User.prototype.leaveRoom = function User$leaveRoom() {
    this._room = null;
};
User.prototype.getRoom = function User$getRoom() {
    return this._room;
};

User.getAllUsers = function User$getAllUsers() {
    return users;
};
User.getUserById = function(id) {
    return users.find(function(user) {
        return user.getId() === id;
    });
};
User.getUserByFullName = function(fullname) {
    return users.find(function(user) {
        return user.getFullName() === fullname;
    });
};
User.getUserByHash = function(hash) {
    return users.find(function(user) {
        return user.getHash() === hash;
    });
};
User.getUserBySocketId = function(id) {
    return users.find(function(user) {
        var s = user.getSocket();
        if (s && s.id === id) {
            return true;
        }
        return false;
    });
};

module.exports = User;

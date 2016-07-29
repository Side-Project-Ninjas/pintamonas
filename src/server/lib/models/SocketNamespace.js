"use strict";

var namespaces = {};

function SocketNamespace(name, socket, onConnectFn) {
    if (!name) {
        throw new Error("Name must be provided");
    }
    if (namespaces[name]) {
        throw new Error("Namespace with this name already exists");
    }
    this._name = name;
    this._socket = socket;
    namespaces[name] = this;
    socket.on("connection", onConnectFn);
}

SocketNamespace.prototype.getName = function SocketNamespace$getName() {
    return this._name;
};
SocketNamespace.prototype.getSocket = function SocketNamespace$getSocket() {
    return this._socket;
};


SocketNamespace.getNamespaces = function SocketNamespace$getNamespaces() {
    return namespaces;
};

SocketNamespace.getNamespace = function SocketNamespace$getNamespace(name) {
    return namespaces[name];
};

module.exports = SocketNamespace;

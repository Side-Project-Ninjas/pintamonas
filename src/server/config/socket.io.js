/**
 * Socket.io configuration
 */
'use strict';

var config = require('./environment');
require('better-strings');

// When the user disconnects
function onDisconnect(socket) {}

// When the user connects
function onConnect(socket) {
    // When the client emits 'info', this listens and executes
    socket.on('info', function(data) {
        socket.log(JSON.stringify(data, null, 2));
    });
}

// Set the SocketIO config up
// ==========================
module.exports = function(socketio) {
    socketio.on('connection', function(socket) {
        // Save address
        socket.address = socket.request.connection.remoteAddress +
            ':' + socket.request.connection.remotePort;

        // Save connection timestamp
        socket.connectedAt = new Date();

        // Define log method
        socket.log = function() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift('SocketIO {0} [{1}]'.format(socket.nsp.name, socket.address));
            console.log.apply(console, args);
        };

        // Call onDisconnect
        socket.on('disconnect', function(){
            onDisconnect(socket);
            socket.log('USER DISCONNECTED');
        });

        // Call onConnect
        onConnect(socket);
        socket.log('USER CONNECTED');
    });
}

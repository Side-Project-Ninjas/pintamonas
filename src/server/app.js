/**
 * Application module
 */
"use strict";

// Common imports
// ==============
var config = require("./config/environment");

// Express setup
// =============
var express = require("express");
var app = express();
require("./config/express")(app);
require("./routes")(app);
var http = require("http").Server(app);

// SocketIO setup
// ==============
var io = require("socket.io")(http);
require("./config/socket.io")(io);


// Start server
// ============
http.listen(3000, function() {
    console.log("listening on :{0}".format(config.port).green);
});

module.exports = {
    express: express,
    app: app,
    http: http,
    io: io
};

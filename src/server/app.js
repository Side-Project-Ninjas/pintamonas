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
// SESSION CAST MUST BE THE SAME TO EXPRESS AND SOCKET.IO IN ORDER TO WORK
var session = require("express-session")({
    secret: "secret",
    key: "express.sid",
    resave: true,
    saveUninitialized: true
});
require("./config/express")(app, session);
require("./routes")(app);
var http = require("http").Server(app);


// SocketIO setup
// ==============
var io = require("socket.io")(http);
var sharedsession = require("express-socket.io-session");
io.use(sharedsession(session, {
    autoSave: true
}));
require("./config/socket.io")(io, session);


// Start server
// ============
http.listen(config.port, function() {
    console.log("listening on http://{0}:{1}".format(config.ip, config.port).green);
});

module.exports = {
    express: express,
    app: app,
    http: http,
    io: io
};

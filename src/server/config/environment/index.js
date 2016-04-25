/**
 * Main env configuration
 */

"use strict";

var path = require("path");

function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error("You must set the " + name + " environment variable");
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV || "development",

    // Root path of server
    root: path.resolve("."),

    // Server port
    port: process.env.PORT || 3000,

    // Server IP
    ip: process.env.IP || "127.0.0.1",

    // Secret key
    secret: process.env.SECRET || "Take it easy!"
};

if (all.env !== "production") {
    console.warn("SERVER IS RUNNING UNDER {0} CONFIG".format(all.env).yellow);
} else {
    console.log("SERVER IS RUNNING UNDER {0} CONFIG".format(all.env)).blue;
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = Object.assign({},
    all,
    require("./shared"),
    require("./{0}.js".format(all.env)) || {}
);

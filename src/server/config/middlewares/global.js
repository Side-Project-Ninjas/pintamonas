/**
 * Express global middlewares
 */
"use strict";

var User = require("../../lib/models/User");

// Set the global express middlewares
// ==================================
module.exports = function(app) {
    //Set user if not exists
    app.use(function createNewUserId(req, res, next) {
        if (req.session && !req.session.userId) {
            req.session.userId = (new User()).getId();
            req.session.save();
        }
        next();
    });

    //Error handling
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });
};

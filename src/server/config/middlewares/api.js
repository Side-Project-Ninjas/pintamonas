/**
 * Express global middlewares
 */
"use strict";

var User = require("../../lib/models/User");

// Set the global express middlewares
// ==================================
module.exports = function(router) {
    //Set user if not exists
    router.use(function rejectIfNotUserName(req, res, next) {
        var user;
        if (req.session && req.session.userId) {
            user = User.getUserById(req.session.userId);
            if (!user.getName()) {
                res.status(401);
                return next(new Error("Full user config is neccessary"));
            }
        } else if (!req.session) {
            res.status(401);
            return next(new Error("Full session config is neccessary"));
        }
        next();
    });

    //Error handling
    router.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
};

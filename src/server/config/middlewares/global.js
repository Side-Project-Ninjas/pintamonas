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
            res.clearCookie('pintamonas.user');
            req.session.userId = (new User()).getId();
            req.session.save();
        } else if (req.session && req.session.userId) {
            var user = User.getUserById(req.session.userId);
            if (user.getName() && !req.cookies['pintamonas.user']) {
                res.cookie('pintamonas.user', user.getName());
            }
        }
        next();
    });

    //Error handling
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.status(500).send("Something broke!");
    });
};

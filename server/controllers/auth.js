var passport = require('passport');

exports.authenticate = passport.authenticate('local');

exports.isAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send("Unauthorized");
    };

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/User');

passport.use(new BasicStrategy((userName, password, callback) => {

        User.findOne({ userName: userName }, (err, user) => {
            if (err) {
                callback(err, null);
                return;
            }

            // No user found with that username
            if (!user) {
                callback(null, false);
                return;
            }

            // Make sure the password is correct
            if (!user.verifyPassword(password)) {
                callback(null, false);
                return;
            }

            callback(null, user);
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
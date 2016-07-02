var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function (passport) {

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => User.findById(id, done));

    passport.use(new LocalStrategy((username, password, callback) => {

            User.findOne({ username: username }, (err, user) => {
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

};

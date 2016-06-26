'use strict';
const User = require('./User');

module.exports = {

    createUser: function(req, res) {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        newUser.save((err) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            } else {
                res.json(newUser);
            }
        });
    },

    getUser: function (req, res) {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            } else if (!user) {
                res.sendStatus(404);
            } else {
                res.json(user);
            }
        });
    }

};

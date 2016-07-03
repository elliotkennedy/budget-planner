var User = require('../models/User');
var jwt = require('jsonwebtoken');
var secret = require('../config/auth');

module.exports = {

    login: function (req, res) {

        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            res.sendStatus(400);
            return;
        }

        User.findOne({ username: username }, (err, user) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            // No user found with that username
            if (!user || !user.verifyPassword(password)) {
                res.sendStatus(401);
                return;
            }
            
            const token = jwt.sign({ user: user.username }, secret.secret, { expiresIn: '7d' });
            res.json({"jwt": token});

        });

    }

};

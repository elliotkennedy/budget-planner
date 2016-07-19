'use strict';
const User = require('../models/User');

function handleResponse(res, obj, error) {
    if (error) {
        console.log(error);
        res.send(error);
        return;
    }

    res.json(obj);
}

exports.createUser = (req, res) => {
    var newUser = new User({
        username: req.body.username
    });

    User.register(newUser, req.body.password, (err, user) => {
        const responseObj = { message: 'User added', data: user };
        handleResponse(res, responseObj, err);
    });
};

exports.getUser = (req, res) => {
    const username = req.params.username;

    User.findByUsername(username, (err, user) => {
        handleResponse(res, user, err);
    });
};

exports.getUserFromLogin = (req, res) => {
    const username = req.body.username;

    User.findByUsername(username, (err, user) => {
        handleResponse(res, user, err);
    });
};

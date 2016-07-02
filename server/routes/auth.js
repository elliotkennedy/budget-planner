var express = require('express');
var router = express.Router();
var auth = require('./auth');
var passport = require('passport');

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json("OK");
});

module.exports = router;

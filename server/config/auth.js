var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports.secret = 'mySecr3t';

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

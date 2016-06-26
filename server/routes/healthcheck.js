var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    //TODO db healthcheck
    res.json({status: 'UP'});
});

module.exports = router;

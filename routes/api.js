require('../models');

var express = require('express'),
    router = express.Router(),
    _ = require('lodash');

router.use('/', express.static('public'));

router.use((req, res, next) => {
    // authentication here
    console.log('get here auth');
    next();
});

router.get('/data.json', (req, res) => {
    res.sendFile(__dirname + '/data.json');
});

router.post('/login', (req, res) => {

});

router.get('/me', (req, res) => {
    res.send('Hello');
    console.log('me called');
});

router.delete('/logout', (req, res) => {

});

router.post('/change-password', (req, res) => {

});

module.exports = router;

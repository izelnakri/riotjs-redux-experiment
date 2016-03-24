require('../models');

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    _ = require('lodash');

router.use('/', express.static('public'));

router.use((req, res, next) => {
    // authentication here
    console.log('get here auth');
    next();
});

router.get('/feedbacks', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/data.json'));
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

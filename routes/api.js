require('../models');

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    bodyParser = require('body-parser'),
    _ = require('lodash');


router.use('/', express.static('public'));

router.use(bodyParser.json());

router.use((req, res, next) => {
    // authentication here
    console.log('get here auth');
    next();
});

router.get('/feedbacks', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/data.json'));
});

router.post('/register', (req, res) => {
    var user = req.body.user;
    console.log(req.body);
    console.log(user);
    User.create(user).then((user) => {
        res.status(200).send(user);
        // send the user data as json
    }).catch((error) => {
        //handle here
        res.status(500).send(error);
        // send the data as json
    });
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

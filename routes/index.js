var express = require('express'),
    router = express.Router(),
    _ = require('lodash');

router.use('/', express.static('public'));

router.get('/', function (req, res) {
    res.sendFile('index.html');
});

router.post('/register', function (req, res) {
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('B4c0/\/', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
});

router.post('/login', function (req, res) {

});

router.get('/logout', function (req, res) {

});

router.delete('/logout', function (req, res) {

});

router.post('/change-password', function (req, res) {

});

router.post('/feedback', function (req, res) {

});

module.exports = router;

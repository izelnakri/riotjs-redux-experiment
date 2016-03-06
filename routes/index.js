var express = require('express'),
    router = express.Router(),
    _ = require('lodash');

router.use('/', express.static('public'));

router.get('/', (req, res) => {
    res.sendFile('index.html');
});

router.post('/register', (req, res) => {
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('B4c0/\/', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
});

router.post('/login', (req, res) => {

});

router.get('/logout', (req, res) => {

});

router.delete('/logout', (req, res) => {

});

router.post('/change-password', (req, res) => {

});

router.post('/feedback', (req, res) => {

});

module.exports = router;

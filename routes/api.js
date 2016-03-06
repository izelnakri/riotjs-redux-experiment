var express = require('express'),
    router = express.Router(),
    _ = require('lodash');

router.use('/', express.static('public'));

router.use(function (req, res, next) {
    // authentication here
    console.log('get here auth');
    next();
});

router.get('/data.json', function (req, res) {
    res.sendFile(__dirname + '/data.json');
});

router.post('/login', function(req, res) {

});

router.get('/me', function(req, res) {
    res.send('Hello');
    console.log('me called');
});

router.delete('/logout', function(req, res) {

});

router.post('/change-password', function(req, res) {

});





// router.get('/api', function(req, res) {
//   res.send('Birds home page');
// });
//
// router.get('/about', function(req, res) {
//   res.send('About birds');
// });
//
module.exports = router;

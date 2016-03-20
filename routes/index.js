// require('../riot-load');

var express = require('express'),
    router = express.Router();

router.use('/', express.static('public'));

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

router.get('/about', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['about']),
            footer: riot.render(views['footer'])
        })
    );
});

router.get('/', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['index']),
            footer: riot.render(views['footer'])
        })
    );
});

module.exports = router;

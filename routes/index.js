// require('../riot-load');

var express = require('express'),
    router = express.Router();

router.use('/', express.static('public', { maxAge: 86400000 }));

router.get('/register', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            footer: riot.render(views['footer'])
        })
    );
});

// router.post('/register', (req, res) => {
//     var user = req.body.user;
//     console.log(user);
//     //save it to a cookie session
//     User.create(user).then((user) => {
//         res.status(200).send(
//             ect.render('layout', {
//                 header: riot.render(views['header']),
//                 page: riot.render(views['register']),
//                 footer: riot.render(views['footer'])
//             })
//         );
//     })
// });

router.get('/login', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['login']),
            footer: riot.render(views['footer'])
        })
    );
});

router.post('/login', (req, res) => {

});

router.get('/logout', (req, res) => {

});

router.delete('/logout', (req, res) => {

});

router.get('/forgot-password', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['forgot-password']),
            footer: riot.render(views['footer'])
        })
    );
});

router.post('/change-password', (req, res) => {

});

router.get('/feedback', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['feedback']),
            footer: riot.render(views['footer'])
        })
    );
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

router.get('/counter', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['counter']),
            footer: riot.render(views['footer'])
        })
    );
});


router.get('/register', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['register']),
            footer: riot.render(views['footer'])
        })
    );
});

router.get('/styleguide', (req, res) => {
    res.render('styleguide/components');
});

router.get('/styleguide/foundation', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['register']),
            footer: riot.render(views['footer'])
        })
    );
});

router.get('/styleguide/components', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['register']),
            footer: riot.render(views['footer'])
        })
    );
});

router.get('/styleguide/templates', (req, res) => {
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            page: riot.render(views['register']),
            footer: riot.render(views['footer'])
        })
    );
});

router.get('/', (req, res) => {
    // res.render('layout');
    res.send(
        ect.render('layout', {
            header: riot.render(views['header']),
            footer: riot.render(views['footer'])
        })
    );
});

module.exports = router;

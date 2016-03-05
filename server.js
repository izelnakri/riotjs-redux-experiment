'use strict';

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    models = require('./models');

// TODO: has_many_password functionality, maybe write a isomorphic rendering example
// password can't be blank if there is digest, max length = 72, pass
// password_confirmation

Object.keys(models).forEach(function(model) {
    if (model !== 'Sequelize' || model !== 'sequelize') {
        global[model] = models[model];
    }
});

app.use('/assets', express.static('assets'));
// app.use('/views', express.static('views'));
app.use('/', express.static('public'));

app.use(morgan('combined'));

app.get('/data.json', function (req, res) {
    res.sendFile(__dirname + '/data.json');
});

app.post('/register', function (req, res) {
    // req.params
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash('B4c0/\/', salt, function(err, hash) {
    //         // Store hash in your password DB.
    //     });
    // });
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// User.findById(4).then(function(a) {
//     console.log(a.email);
// });

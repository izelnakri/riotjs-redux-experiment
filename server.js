'use strict';

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    models = require('./models');

// TODO: write tests for has_many_password, maybe write a isomorphic rendering example

Object.keys(models).forEach(function(model) {
    if (model !== 'Sequelize' || model !== 'sequelize') {
        global[model] = models[model];
    }
});

app.use('/', express.static('public'));
// app.use('/views', express.static('views'));

if (process.env['NODE_ENV'] === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

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

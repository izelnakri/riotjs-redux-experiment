'use strict';

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    models = require('./models'),
    html = require('./routes'),
    api = require('./routes/api');

// TODO: write tests for has_many_password, maybe write a isomorphic rendering example
Object.keys(models).forEach(function(model) {
    global[model] = models[model];
});

if (process.env['NODE_ENV'] === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use('/', html);
app.use('/api', api);

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

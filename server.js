'use strict';

require('colors');
require('./models');
require('./riot-load');

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    ect = require('ect')({
        watch: true, root: __dirname + '/views', ext : '.ect'
    }),
    port = process.env.PORT || 3000;

if (process.env['NODE_ENV'] === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.set('view engine', 'ect');
app.engine('ect', ect.render);

var html = require('./routes'),
    api = require('./routes/api');

app.use('/', html);
app.use('/api', api);

app.get('*', (req, res) => {
    res.render('layout');
    // res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('Riot.js Experiment app listening on port %d!'.green, port);
});

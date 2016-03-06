'use strict';

require('colors');
require('./models');

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    html = require('./routes'),
    api = require('./routes/api'),
    port = process.env.PORT || 3000;

if (process.env['NODE_ENV'] === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use('/', html);
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log('Example app listening on port %d!'.green, port);
});

'use strict';

require('./models');

var express = require('express'),
    app = express(),
    morgan = require('morgan'),
    html = require('./routes'),
    api = require('./routes/api');

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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

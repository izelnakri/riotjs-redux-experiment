// maybe write a isomorphic rendering example`

var express = require('express'),
    app = express(),
    morgan = require('morgan');

app.use('/assets', express.static('assets'));
app.use(morgan('combined'));

// app.use('/views', express.static('views'));

app.get('/data.json', function (req, res) {
    res.sendFile(__dirname + '/data.json');
});

// app.get('/views/*', function (req, res) {
//     res.sendFile(__dirname + '/views' + req.params[0]);
// });

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

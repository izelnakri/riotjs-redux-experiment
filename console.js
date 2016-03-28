require('babel-register')({
   presets: [ 'es2015' ]
});
global.assets = require('./config/assets.json');

require('./models');
require('./riot-load');

var _ = require('lodash'),
    repl = require('repl'),
    Repl = repl.start('> ');

Repl.context._ = _;

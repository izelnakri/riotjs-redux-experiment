require('node-babel')();
require('./models');
require('./riot-load');

var _ = require('lodash'),
    repl = require('repl'),
    Repl = repl.start('> ');

Repl.context._ = _;

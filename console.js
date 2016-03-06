'use strict';
require('./models');

var repl = require('repl'),
    _ = require('lodash');

var Repl = repl.start('> ');
Repl.context._ = _;

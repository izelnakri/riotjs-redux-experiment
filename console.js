'use strict';
require('./models');

var _ = require('lodash'),
    repl = require('repl'),
    Repl = repl.start('> ');

Repl.context._ = _;

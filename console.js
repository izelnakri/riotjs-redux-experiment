'use strict';
var repl = require('repl'),
    models = require('./models'),
    _ = require('lodash');

var Repl = repl.start('> ');

// Binding models to the REPL context:
Repl.context._ = _;
Repl.context.models = models;
Object.keys(models).forEach(function(model) {
    Repl.context[model] = models[model];
});

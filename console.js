'use strict';
// to be implemented; smt like a rails console
var repl = require('repl'),
    models = require('./models'),
    _ = require('lodash');

var Repl = repl.start('> ');

// Bouding models to the REPL context:
Repl.context.models = models;
Object.keys(models).forEach(function(model) {
    if (model !== 'Sequelize' || model !== 'sequelize') {
        Repl.context[model] = models[model];
    }
});

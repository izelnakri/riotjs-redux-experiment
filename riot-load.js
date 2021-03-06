global._ = require('lodash');

import * as actions from './frontend/js/actions';
import * as reducers from './frontend/js/reducers';
import * as selectors from './frontend/js/selectors'; // might be unnecessary

global.actions = actions;
global.reducers = reducers;
global.selectors = selectors; // might be unnecessary

var fs = require('fs'),
    path = require('path'),
    Redux = require('redux'),
    riot = require('riot');

global.ect = require('ect')({
    watch: true, root: __dirname + '/views', ext : '.ect'
});

global.riot = riot;

var walk = function(dir) {
    var results = [],
        list = fs.readdirSync(dir);

    list.forEach(function(file) {
        var absFile = dir + '/' + file,
            stat = fs.statSync(absFile);

        if (stat && stat.isDirectory()) {
            results = results.concat(walk(absFile));
        } else {
            results.push(absFile.replace(__dirname + '/', ''));
        }
    });
    return results;
};

global.views = {};

walk(__dirname + '/frontend/js')
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file.slice(-4) === '.tag');
    })
    .forEach((file) => {
        var name = file.replace('frontend/js/pages/', '')
            .replace('frontend/js/components/', '').replace('.tag', '');
        console.log(name);

        if (name !== 'form' && name !== 'input-password') {
            global.views[name] = require('./' + file);
        }
    });

var initialState = {
    todosVisibilityFilter: 'SHOW_ALL',
    todos: [],
    todo: {},
    user: {},
    counter: 0,
    feedbacks: {
        count: 0,
        count_nolimit: 0,
        items: [],
        total: 0,
        ratings: [1, 2, 3, 4, 5]
    }
};

function store(state, action) {
    if (!state) {
        state = initialState;
    }

    // namespace these reducers with ES6 imports:
    return {
        user: reducers.user(state.user, action),
        todos: reducers.todos(state.todos, action),
        todo: reducers.todo(state.todo, action),
        counter: reducers.counter(state.counter, action),
        todosVisibilityFilter: reducers.visibilityFilter(state.todosVisibilityFilter, action),
        feedbacks: reducers.feedbacks(state.feedbacks, action)
    };
}

var Store = Redux.createStore(store);

// // CREATE AN ISSUE FOR SELF.ROOT.QUERYSELECTOR
global.riot.mixin({
    init: function () {
        global._ = _;
        global.Chart = function(){};
    }
});

global.riot.mixin('store', {
    init: function () {
        var self = this;

        global.Store = Store;
        global.dispatch = global.Store.dispatch;

        self.on('mount', function() {
            if (self.opts.store) {
                self.store = self.opts.store;
            } else {
                self.store = Store.getState();                
            }

            // Store.subscribe(function() {
            //     self.store = Store.getState();
            //     // performance optimization: find which selector is used
            // });
            // console.log('Store mount is called for a tag: ' + self.root.tagName);
            // self.update();
        });
    }
});

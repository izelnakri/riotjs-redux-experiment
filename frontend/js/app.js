// no need for a fancy flux store for this example, not a very fancy store ;)
var App = {};
App.load = function () {
    riot.visit = function (pageName) {
        riot.mount('#page', 'page-' + pageName);
    };

    riot.route('/', function() {
        riot.visit('index');
        console.log('root route is called');
    });

    riot.route('/about', function() {
        riot.visit('about');
    });

    riot.route('/contact', function() {
        riot.visit('contact');
    });

    riot.route('/counter', function() {
        riot.visit('counter');
    });

    riot.route('/forgot-password', function() {
        riot.visit('forgot-password');
    });

    riot.route('/login', function() {
        riot.visit('login');
    });

    riot.route('/privacy', function() {
        riot.visit('privacy');
    });

    riot.route('/register', function() {
        riot.visit('register');
    });

    riot.route('/search?keyword=*', function(keyword) {
        riot.visit('search');
        console.log('Search keyword: ' + keyword);
    });

    riot.route('/terms', function() {
        riot.visit('terms');
    });

    riot.route(function(collection, id, action) {
        console.log('Collection is: ' + collection);
        console.log('id is: ' + id);
        console.log('action is: ' + action);
    });

    riot.route.base('/');
    riot.route.start(true);

    App.load = function(){}; // so nobody can call it again
};

// api + store

var store = {};

$.getJSON('/api/data.json').then(function (data) {
    store = data;
    riot.mount('*');
    App.load();
});

// REDUX HERE ==========================================
//normalizr and camelCase libraries + Babel probably needed
function userReducer(state, action) {
    if(!state) { state = 0; }
    switch(action.type) {
        case 'USER_CREATE':
            return {
                username: action.username,
                email: action.email,
                name: action.name,
                firstName: action.firstName,
                lastName: action.lastName,
                created_at: '',
                updated_at: '',
                passwordDigest: ''
            };
        default:
            return state;
    }
}

// TRY this below with counter and store:
var initialState = {
    todosVisibilityFilter: 'SHOW_ALL',
    todos: [],
    todo: {},
    counter: 0
};

function storeLogic(state, action) {
    if (!state) {
        state = initialState;
    }

    // namespace these reducers with ES6 imports:
    return {
        user: userReducer(state.user, action),
        todos: todosReducer(state.todos, action),
        todo: todoReducer(state.todo, action),
        counter: counterReducer(state.counter, action),
        todosVisibilityFilter: todosVisibilityFilter(state.todosVisibilityFilter, action)
    };
}

var Store = Redux.createStore(storeLogic);

Store.subscribe(function() {
    console.log(Store.getState());
});

riot.mixin('store', {
    init: function() {
        var self = this;

        Store = Store;
        dispatch = Store.dispatch;

        self.on('mount', function() {
            self.store = Store.getState();

            Store.subscribe(function() {
                self.store = Store.getState();
                // performance optimization: find which selector is used
            });
            console.log('Store mount is called for a tag');
            self.update();
        });

        self.on('update', function() {
            console.log('Store update is called for a tag');
        });

        // performance optimization: unsubscribe on unmount if its necessary
    }
});

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

// var reducer = Redux.combineReducers({
//   a: doSomethingWithA,
//   b: processB,
//   c: c
// })

function applicationLogic(state, action) {
    _.defaults(state, initialState);
    return {
        user: userReducer(state.user, action),
        todos: todosReducer(state.todos, action),
        todo: todoReducer(state.todo, action),
        todosVisibilityFilter: todosVisibilityFilter(state.todosVisibilityFilter, action)
    };
}

var ReduxStore = Redux.createStore(applicationLogic);

ReduxStore.subscribe(function() {
    console.log(ReduxStore.getState());
});

// ReduxStore.dispatch({ type: 'INCREMENT' });
// ReduxStore.dispatch({ type: 'INCREMENT' });

var initialState = {
    visibilityFilter: 'SHOW_ALL',
    todos: []
};

function todoApp(state, action) {
    if (typeof state === 'undefined') {
        return initialState;
    }

    // For now, don’t handle any actions
    // and just return the state given to us.
    return state;
}

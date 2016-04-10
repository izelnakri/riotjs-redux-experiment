// jquery, lodash, riot, views, chart, copy
import './store.js';
import './copy.js';
import './form-validator';

window.App = {};

riot.visit = function(pageName, opts) {
    riot.mount('#page', 'page-' + pageName, opts);
};

App.routesLoad = (function() {
    riot.route('/', function() {
        console.log('root route is called');
        if (Store.getState().user.isLoggedIn) {
            return riot.visit('user-home');
        } else {
            riot.visit('index');
            Store.dispatch(actions.fetchFeedbacksIfNeeded());
        }
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

    return function(){}; // so nobody can call it again
}());

App.routesLoad();

// import './constants';
// import {Store} from './store.js';
// import * as API from './api';
import './store.js';

window.App = {};

App.routesLoad = function () {
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

    App.routesLoad = function(){}; // so nobody can call it again
};

var AppInitializer = (function () {
    $.getJSON('/api/data.json').then(function (data) {
        window.store = data;
        riot.mount('*');
        App.routesLoad();
    });

    return {};
})();

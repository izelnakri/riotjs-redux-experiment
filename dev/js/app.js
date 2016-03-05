// no need for a fancy flux store for this example, not a very fancy store ;)
var App = {};
App.load = function () {
    riot.renderPage = function (pageName) {
        // maybe riot unmount here first
        riot.mount('page', 'page-' + pageName);
    };
    riot.route('/', function() {
        riot.renderPage('index');
        console.log('root route is called');
    });

    riot.route('/about', function() {
        riot.renderPage('about');
    });

    riot.route('/contact', function() {
        riot.renderPage('contact');
    });

    riot.route('/forgot-password', function() {
        riot.renderPage('forgot-password');
    });

    riot.route('/login', function() {
        riot.renderPage('login');
    });

    riot.route('/privacy', function() {
        riot.renderPage('privacy');
    });

    riot.route('/register', function() {
        riot.renderPage('register');
    });

    riot.route('/search?keyword=*', function(keyword) {
        riot.renderPage('search');
        console.log('Search keyword: ' + keyword);
    });

    riot.route('/terms', function() {
        riot.renderPage('terms');
    });

    riot.route(function(collection, id, action) {
        console.log('Collection is: ' + collection);
        console.log('id is: ' + id);
        console.log('action is: ' + action);
    });

    riot.route.base('/');
    riot.route.start(true);

    App.loadRoutes = function(){}; // so nobody can call it again
};

var store = {};

$.getJSON('/data.json').then(function (data) {
    store = data;
    riot.mount('*');
    App.load();
});

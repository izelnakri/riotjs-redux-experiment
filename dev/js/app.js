// no need for a fancy flux store for this example, not a very fancy store ;)
var App = {};
App.load = function () {
    riot.renderPage = function (pageName) {
        // maybe riot unmount here first
        riot.mount('page', 'page-' + pageName);
    };

    riot.route('/login', function() {
        console.log('/login route is called');
        riot.renderPage('login');
    });

    riot.route('/', function() {
        console.log('root route is called');
        riot.renderPage('index');
    });

    riot.route('/signup', function() {
        console.log('/signup route is called');
    });

    riot.route('/forgot-password', function() {
        console.log('/forgot-password route is called');
    });

    riot.route('/search?keyword=*', function(keyword) {
        console.log('Search keyword: ' + keyword);
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

import './store.js';

window.App = {};

App.routesLoad = function () {
    riot.visit = function (pageName, opts) {
        riot.mount('#page', 'page-' + pageName, opts);
    };

    riot.route('/', function() {
        riot.visit('index');
        fetch('/api/feedbacks')
              .then(response => response.json())
              .then(json => Store.dispatch(actions.fetchFeedbacksIfNeeded(json)));
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
    $.getJSON('/api/feedbacks').then(function (data) {
        // window.store.feedbacks = data;
        riot.mount('*');
        App.routesLoad();
    });

    return {};
})();

// assign variable to the copy !!
window.t = function(key, expression) {
    //locale set will be via store
    var locale = "en";

    var langs = {
      "en": {
          "hello_world": "Hello world!",
          "user": {
              "name": "Izel",
              "full_name": "Nakri",
              "memberships": {
                  "first": "Illuminati",
                  "second": "Secret Club"
              }
          },
          "selected_feedbacks": { // turn this to array in JSON
              "0": [
                  {
                      "expression": "selected_feedbacks === '3'",
                      "value": ""
                  }
              ],
              "1": {

              }
          }
      },
      "ja": {
          "hello_world": "こんにちは世界!"
      }
    };

    return langs[locale][key];

    // add angular $parse;

    // . notation in the string, accept expressions
};

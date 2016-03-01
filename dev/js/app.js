// no need for a fancy flux store for this example, not a very fancy store ;)
var store = {};

$.getJSON('data.json').then(function (data) {
    store = data;
    riot.mount('*');
});

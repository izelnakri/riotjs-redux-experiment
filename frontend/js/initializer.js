// this will check the localStorage cache and
// make necessary requests to fill the localStorage

// api + store

// TRY this below with counter and store:
var AppInitializer = (function () {
    $.getJSON('/api/data.json').then(function (data) {
        store = data;
        riot.mount('*');
        App.routesLoad();
    });

    return {};
})();

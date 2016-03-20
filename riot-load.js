var fs = require('fs'),
    path = require('path'),
    _ = require('lodash'),
    riot = require('riot');

global.ect = require('ect')({
    watch: true, root: __dirname + '/views', ext : '.ect'
});

global.riot = riot;

// CREATE AN ISSUE FOR SELF.ROOT.QUERYSELECTOR
global.riot.mixin({
    init: function () {
        global._ = _;
        global.store = {};
        global.Chart = function(){};
    }
});

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

console.log(__dirname);

walk(__dirname + '/frontend/js')
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file.slice(-4) === '.tag');
    })
    .forEach((file) => {
        var name = file.replace('frontend/js/pages/', '')
            .replace('frontend/js/components/', '').replace('.tag', '');
        console.log(name);

        global.views[name] = require('./' + file);
    });

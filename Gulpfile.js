'use strict';

var fs = require('fs'),
    util = require('util'),
    _ = require('lodash'),
    colors = require('colors'),
    gulp = require('gulp'),
    rev = require('gulp-rev'),
    revDel = require('rev-del'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'), // check if needed
    source = require('vinyl-source-stream'), // check if needed
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssMinify = require('gulp-cssnano'),
    cssPrefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    jsonlint = require("gulp-jsonlint"),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    plumber = require('gulp-plumber'),
    notifier = require('node-notifier'),
    runMocha = require('gulp-mocha');
    // Server = require('karma').Server;

    // maybe add gulp notify

// maybe add usage:
// maybe - dev mode assignment logic via yargs, build.js

var JS_VENDORS = [
    'frontend/js/vendor/redux.js',
    'frontend/js/vendor/fetch.js',
    'frontend/js/vendor/ngParser.js',
    'frontend/js/vendor/mustache.js',
    'frontend/js/vendor/chart.js',
    'frontend/js/vendor/moment.js',
    'frontend/js/vendor/raven.js'
    ],
    JS_PLUGINS = [
    'frontend/js/vendor/bootstrap.js',
    'frontend/js/vendor/parsley.js',
    'frontend/js/vendor/jquery-serialize-object.js'
    ],
    COMPONENTS_PATH = 'frontend/js/components/*.tag',
    PAGES_PATH = 'frontend/js/pages/*.tag',
    CONSTANTS_PATH = 'frontend/js/constants/*.js',
    ACTIONS_PATH = 'frontend/js/actions/*.js',
    REDUCERS_PATH = 'frontend/js/reducers/*.js',
    SELECTORS_PATH = 'frontend/js/selectors/*.js',
    API_PATH = 'frontend/js/api/*.js',
    COPY_PATH = 'copy/*.json';

var notify = function (errorMessage) {
    return function(error) {
        var message = error.message.replace(__dirname, '.');
        console.log('plumber error occured '.red + errorMessage.blue + '!');
        console.log(message.yellow);

        notifier.notify({
            title: 'build failed',
            message: message
        });
    };
};


gulp.task('scss', function () {
    return gulp.src('frontend/scss/application.scss')
        .pipe(plumber({
            errorHandler: notify('scss error')
        }))
        .pipe(sass({
            cacheLocation: 'tmp/sass',
            onError: function (errorMessage) {
                console.log(errorMessage);
                // return false;
             }
        }))
        .pipe(cssPrefix())
        .pipe(cssMinify()) // maybe: .pipe(gulpif(!devMode, cssMinify()))
        .pipe(concat('application.css'))
        .pipe(size({ title: 'application.css' }))
        .pipe(rev())
        .pipe(gulp.dest('public/css'))
        .pipe(rev.manifest('config/assets.json', {
            base: 'config',
            merge: true
        }))
        .pipe(revDel({
            dest: 'public/css',
            oldManifest: 'config/assets.json'
        }))
        .pipe(gulp.dest('config'));
});

gulp.task('js:vendor', function() {
    return gulp.src(JS_VENDORS)
        .pipe(concat('vendor.js'))
        .pipe(size({ title: 'vendor.js' }))
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest('config/assets.json', {
            base: 'config',
            merge: true
        }))
        .pipe(revDel({
            dest: 'public/js',
            oldManifest: 'config/assets.json'
        }))
        .pipe(gulp.dest('config'));
});

gulp.task('js:plugins', function() {
    return gulp.src(JS_PLUGINS)
        .pipe(concat('plugins.js'))
        .pipe(size({ title: 'plugins.js' }))
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest('config/assets.json', {
            base: 'config',
            merge: true
        }))
        .pipe(revDel({
            dest: 'public/js',
            oldManifest: 'config/assets.json'
        }))
        .pipe(gulp.dest('config'));
});

gulp.task('js:copy:lint', function() {
    return gulp.src(COPY_PATH)
        .pipe(plumber({
            errorHandler: notify('js:copy error')
        }))
        .pipe(jsonlint())
        .pipe(jsonlint.reporter())
        .pipe(jsonlint.failAfterError());
});

gulp.task('js:copy', ['js:copy:lint'], function() {
    // possible improvements:
    // compare different langs for key mismatch warn them in build process!!
    // this should be done on server when it gets huge
    var lang = {},
        dist = './tmp/js/copy.js';
    fs.readdirSync('./copy').filter(function(fileName) {
        return fileName.slice(-5) === '.json'; // return only .json
    }).forEach(function(fileName) {
        var content = fs.readFileSync('./copy/' + fileName, {encoding: 'utf8'});
        _.extend(lang, JSON.parse(content)); //add the file to lang js object
    });

    fs.writeFile(dist, "window.lang = " + util.inspect(lang, {depth: null}) + ";", (err) => {
        if (err) { throw err; }
        
        return gulp.src(dist)
                .pipe(size({ title: 'copy.js' }))
                .pipe(rev())
                .pipe(gulp.dest('public/js'))
                .pipe(rev.manifest('config/assets.json', {
                    base: 'config',
                    merge: true
                }))
                .pipe(revDel({
                    dest: 'public/js',
                    oldManifest: 'config/assets.json'
                }))
                .pipe(gulp.dest('config'));
    });
});

gulp.task('js:components:lint', function () {
    return gulp.src(COMPONENTS_PATH)
        .pipe(jshint.extract('auto'))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('js:components:concat', ['js:components:lint'], function () {
    return gulp.src(COMPONENTS_PATH)
        .pipe(concat('components.tag'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('js:components:shell', ['js:components:concat'], function () {
    return gulp.src('tmp/js/components.tag')
        .pipe(plumber({
            errorHandler: notify('js:components:shell riot error')
        }))
        .pipe(shell('riot tmp/js/components.tag tmp/js/components.js --m')); // this is async
});

gulp.task('js:components', function (callback) {
    runSequence('js:components:shell', callback);
});

gulp.task('js:pages:lint', function () {
    return gulp.src(PAGES_PATH)
        .pipe(jshint.extract('auto'))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('js:pages:concat', ['js:pages:lint'], function () {
    return gulp.src(PAGES_PATH)
        .pipe(concat('pages.tag'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('js:pages:shell', ['js:pages:concat'], function () {
    return gulp.src('tmp/js/pages.tag')
        .pipe(plumber({
            errorHandler: notify('js:pages:shell riot error')
        }))
        .pipe(shell('riot tmp/js/pages.tag tmp/js/pages.js --m')); // this is async
});

gulp.task('js:pages', function (callback) {
    runSequence('js:pages:shell', callback);
});

gulp.task('js:riot:compile', ['js:components', 'js:pages'], function() {
    return gulp.src(['tmp/js/components.js', 'tmp/js/pages.js'])
        .pipe(plumber({
            errorHandler: notify('js:riot:compile js error')
        }))
        .pipe(uglify())
        .pipe(concat('views.js'))
        .pipe(size({ title: 'views.js' }))
        .pipe(rev())
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest('config/assets.json', {
            base: 'config',
            merge: true
        }))
        .pipe(revDel({
            dest: 'public/js',
            oldManifest: 'config/assets.json'
        }))
        .pipe(gulp.dest('config'));
});

gulp.task('js:compile', function() {
    var bundler = browserify({
        entries: 'frontend/js/app.js',
        debug: true
    });
    bundler.transform(babelify, {presets: ["es2015"]});
    bundler.bundle()
        .on('error', function (err) {
            // this is plumber like error reporting
            console.log('ERROR OCCURED ON js:compile'.red);
            console.error(err);
            notifier.notify({
                title: 'build failed',
                message: err
            });
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify()) // Use any gulp plugins you want now
        .pipe(size({ title: 'app.js' }))
        .pipe(rev())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('public/js'))
        .pipe(rev.manifest('config/assets.json', {
            base: 'config',
            merge: true
        }))
        .pipe(revDel({
            dest: 'public/js',
            oldManifest: 'config/assets.json'
        }))
        .pipe(gulp.dest('config'));
    // delete the old manifest
});
//
gulp.task('js:del:sourcemaps', function() {
    // we are fixing a bug manually
    fs.readdirSync('./public/js/maps').forEach((fileName) => {
        fs.unlink('./public/js/maps/' + fileName);
    });
});

gulp.task('test:components', function () {
    return gulp.src('test/frontend/components/*.js', {read: false}) // add mocha config for requires
        .pipe(runMocha({reporter: 'spec', timeout: 15000 }));
});

gulp.task('test:unit', function () {
    process.env.NODE_ENV = 'test';

    return gulp.src('test/backend:unit/*.js', {read: false})
            .pipe(runMocha({reporter: 'spec', timeout: 10000 }));
});

// gulp.task('test:once', function (done) {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

gulp.task('compile', function () {
    return runSequence(
        'scss', 'js:copy', 'js:vendor', 'js:plugins', 'js:riot:compile',
        'js:compile'
    );
});

gulp.task('watch', function() {
    runSequence(
        'scss', 'js:del:sourcemaps', 'js:copy', 'js:vendor', 'js:plugins',
        'js:riot:compile', 'js:compile'
    );

    gulp.watch('frontend/scss/**/*.scss', ['scss']);
    gulp.watch(JS_VENDORS, ['js:vendors']);
    gulp.watch(JS_PLUGINS, ['js:plugins']);
    gulp.watch(COPY_PATH, ['js:copy']);
    gulp.watch([COMPONENTS_PATH, PAGES_PATH], ['js:riot:compile']);
    gulp.watch([
        CONSTANTS_PATH, ACTIONS_PATH, REDUCERS_PATH, API_PATH,
        SELECTORS_PATH, 'frontend/js/*.js'
    ], ['js:compile']);
});

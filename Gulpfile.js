'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    cssMinify = require('gulp-cssnano'),
    cssPrefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence'),
    Server = require('karma').Server,
    runMocha = require('gulp-mocha');

    // plumber = require('gulp-plumber'),
    // sourcemaps = require('gulp-sourcemaps'),
    // maybe add gulp notify and gulpif

// for js: sourcemaps, uglify, jshint, plumber, maybe babel
// for js: require, riotjs

// maybe add usage:
// maybe - dev mode assignment logic via yargs, build.js

var JS_VENDORS = [
    'frontend/js/vendor/system.js',
    'frontend/js/vendor/riot+compiler.js',
    'frontend/js/vendor/chart.js',
    'frontend/js/vendor/jquery.js',
    'frontend/js/vendor/redux.js',
    'frontend/js/vendor/bootstrap.js',
    'frontend/js/vendor/lodash.js',
    'frontend/js/vendor/moment.js'
    ],
    CONSTANTS_PATH = 'frontend/js/constants/*.js',
    ACTIONS_PATH = 'frontend/js/actions/*.js',
    REDUCERS_PATH = 'frontend/js/reducers/*.js',
    API_PATH = 'frontend/js/api/*.js',
    COMPONENTS_PATH = 'frontend/js/components/*.tag',
    PAGES_PATH = 'frontend/js/pages/*.tag';

gulp.task('scss', function () {
    return gulp.src('frontend/scss/application.scss')
        .pipe(sass({
            cacheLocation: 'tmp/sass',
            onError: function (errorMessage) {
                console.log(errorMessage);
                return false;
             }
        }))
        .pipe(cssPrefix())
        .pipe(cssMinify()) // maybe: .pipe(gulpif(!devMode, cssMinify()))
        .pipe(concat('application.css'))
        .pipe(gulp.dest('public/css'));
});

gulp.task('js:vendor', function () {
    return gulp.src(JS_VENDORS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('tmp/js'));
});


// reducers and actions use the constants

// components use the actions

// js:reducers index should import them all the reducers then .combineReducers


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
        .pipe(shell('riot tmp/js/pages.tag tmp/js/pages.js --m')); // this is async
});

gulp.task('js:pages', function (callback) {
    runSequence('js:pages:shell', callback);
});

gulp.task('js:redux', function () {
    return gulp.src([
        'frontend/js/constants/index.js',
        'frontend/js/actions/index.js',
        'frontend/js/reducers/index.js',
        'frontend/js/api/index.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({ plugins: 'transform-es2015-modules-systemjs' }))
        .pipe(concat('store.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('js:compile', ['js:vendor', 'js:redux', 'js:components', 'js:pages'], function () {
    return gulp.src([
        'tmp/js/vendor.js', 'tmp/js/store.js','tmp/js/components.js',
        'tmp/js/pages.js', 'frontend/js/app.js', 'frontend/js/store.js',
        'frontend/js/initializer.js'
        ])
        .pipe(uglify())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('public/js'));
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

gulp.task('watch', ['scss', 'js:compile'], function () {
    gulp.watch('frontend/scss/**/*.scss', ['scss']);
    gulp.watch(COMPONENTS_PATH, ['js:compile']);
    gulp.watch(PAGES_PATH, ['js:compile']);
    gulp.watch(CONSTANTS_PATH, ['js:compile']);
    gulp.watch(ACTIONS_PATH, ['js:compile']);
    gulp.watch(REDUCERS_PATH, ['js:compile']);
    gulp.watch(API_PATH, ['js:compile']);
    gulp.watch('frontend/js/app.js', ['js:compile']);
});

'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssMinify = require('gulp-cssnano'),
    cssPrefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    shell = require('gulp-shell'),
    runSequence = require('run-sequence');
    // plumber = require('gulp-plumber'),
    // sourcemaps = require('gulp-sourcemaps'),
    // maybe add gulp notify and gulpif

// for js: sourcemaps, uglify, jshint, plumber, maybe babel
// for js: require, riotjs

// maybe add usage:
// maybe - dev mode assignment logic via yargs, build.js

var JS_VENDORS = [
    'dev/js/vendor/riot+compiler.js',
    'dev/js/vendor/chart.js',
    'dev/js/vendor/jquery.js',
    'dev/js/vendor/bootstrap.js',
    'dev/js/vendor/lodash.js',
    'dev/js/vendor/moment.js',
    'dev/js/store.js'
    ],
    COMPONENTS_PATH = 'dev/js/components/*.tag';

gulp.task('scss', function () {
    return gulp.src('dev/scss/application.scss')
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
        .pipe(gulp.dest('assets/css'));
});

gulp.task('js:vendor', function () {
    return gulp.src(JS_VENDORS)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('js:components', ['js:riot:sync'], function () {
    return gulp.src('tmp/js/components.js')
        .pipe(concat('components.js'))
        .pipe(gulp.dest('app/assets/javascripts'));
});

gulp.task('js:riot:lint', function () {
    return gulp.src(COMPONENTS_PATH)
        .pipe(jshint.extract('auto'))
        .pipe(jshint())
        .pipe(jshint.reporter(jshintStylish));
});

gulp.task('js:riot:concat', ['js:riot:lint'], function () {
    return gulp.src(COMPONENTS_PATH)
        .pipe(concat('components.tag'))
        .pipe(gulp.dest('tmp/js'));
});

gulp.task('js:riot:shell', ['js:riot:concat'], function () {
    return gulp.src('tmp/js/components.tag')
        .pipe(shell('riot tmp/js/components.tag tmp/js/components.js --m')); // this is async
});

gulp.task('js:riot:sync', function (callback) {
    runSequence('js:riot:shell', callback);
});

gulp.task('js:compile', ['js:vendor', 'js:components'], function () {
    return gulp.src(['tmp/js/vendor.js', 'tmp/js/components.js', 'dev/js/app.js'])
        .pipe(uglify())
        .pipe(concat('application.js'))
        .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', ['scss', 'js:compile'], function () {
    gulp.watch('dev/scss/**/*.scss', ['scss']);
    gulp.watch(COMPONENTS_PATH, ['js:compile']);
    gulp.watch('dev/js/app.js', ['js:compile']);
});

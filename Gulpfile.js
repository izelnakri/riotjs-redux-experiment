'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    cssMinify = require('gulp-cssnano'),
    cssPrefix = require('gulp-autoprefixer');
    // plumber = require('gulp-plumber'),
    // sourcemaps = require('gulp-sourcemaps'),
    // maybe add gulp notify and gulpif
    // add rubocop pre-commit hook

// for js: sourcemaps, uglify, jshint, plumber, maybe babel
// for js: copy, requirejs, riotjs

// add usage

// maybe - dev mode assignment logic via yargs, build.js
gulp.task('scss', function () {
    return gulp.src('app/assets/stylesheets/require.scss')
        .pipe(sass({
            cacheLocation: 'tmp/sass',
            onError: function (errorMessage) {
                console.log(errorMessage);
                return false;
             }
        }))
        .pipe(cssPrefix())
        .pipe(cssMinify()) // maybe: .pipe(gulpif(!devMode, cssnano()))
        .pipe(concat('application.css'))
        .pipe(gulp.dest('app/assets/stylesheets'));
});

gulp.task('js', function () {
    // return
});

gulp.task('watch', ['scss'], function () {
    gulp.watch('app/assets/stylesheets/**/*.scss', ['scss']);
});

// for angularjs:

// var nodeModules = [
//     "node_modules/angular2/bundles/angular2-polyfills.js",
//     "node_modules/systemjs/dist/system.src.js",
//     "node_modules/rxjs/bundles/Rx.js",
//     "node_modules/angular2/bundles/angular2.dev.js"
// ]


gulp.task('node_modules', function () {
    return gulp.src(nodeModules)
        .pipe(concat('/angular-bundle.js'))
        .pipe(gulp.dest('app/assets/javascripts'))
});

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    rimraf = require('rimraf');

var paths = {
    srcDir: './src',
    distDir: './dist'
};
paths.src = {
    js: paths.srcDir + '/js',
    scss: paths.srcDir + '/scss',
    fonts: paths.srcDir + '/fonts'
};
paths.dist = {
    js: paths.distDir + '/js',
    css: paths.distDir + '/css',
    fonts: paths.distDir + '/fonts'
};

gulp.task('scss:build', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: '../src/scss' }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('fonts:build', function() {
    return gulp.src('./src/fonts/**/*.{css,eot,svg,woff,woff2}')
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('js:build', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify({ preserveComments: 'license' }))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['js:build', 'scss:build', 'fonts:build']);

gulp.task('watch', function() {
    watch([paths.src.scss], function() {
        return gulp.start('scss:build');
    });
    watch([paths.src.js], function() {
        return gulp.start('js:build');
    });
    watch([paths.src.fonts], function() {
        return gulp.start('fonts:build');
    });
});

gulp.task('clean', function(cb) {
    rimraf(paths.distDir, cb);
});

gulp.task('default', ['build']);

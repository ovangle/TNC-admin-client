var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');

var webpack = require('webpack-stream');

gulp.task('clean', function(cb) {
    return del(['dist', 'prod'], cb);
});

gulp.task('default', ['scripts', 'templates', 'styles'], function() {});
gulp.task('release', ['scripts'], function() {});

/**
 * Typescript compilation
 */
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject));

    return merge([
        //tsResult.jsmap.pipe(gulp.dest('dist')),
        tsResult.js
            .pipe(gulp.dest('dist'))
            .pipe(sourcemaps.write())
    ]);
});

gulp.task('scripts-prod', ['scripts'], function() {
    return gulp.src('dist/src/app.js')
        .pipe(webpack())
        .pipe(gulp.dest('prod/'))

});

/**
 * HTML templates
 */
gulp.task('templates', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/src'));
});

/**
 * CSS stylesheets
 */
gulp.task('styles', function() {
    gulp.src('src/**/*.css')
        .pipe(gulp.dest('dist/src'));
});

gulp.task('watch', ['scripts', 'templates', 'styles'], function() {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.html', ['templates']);
    gulp.watch('src/**/*.css', ['styles']);
});

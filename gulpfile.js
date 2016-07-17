var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');

/**
 * Typescript compilation
 */
var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function(cb) {
    return del(['dist'], cb);
});

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

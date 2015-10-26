'use strict';

var gulp        = require('gulp');
var cached      = require('gulp-cached');
var debug       = require('gulp-debug');
var livereload  = require('gulp-livereload');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var beep        = require('beepbeep')

var onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

// JS
// refer to this link
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/incremental-builds-with-concatenate.md
var scriptsGlob = [
    './src/components/jquery/dist/jquery.min.js',
    './src/js/*.js' ];
gulp.task('scripts', function() {
  return gulp.src(scriptsGlob)
    .pipe(cached('scripts'))
    .pipe(debug())
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest('./dist/js'))
});
//.pipe(uglify({
  //compress: false
//}))

// Sass
gulp.task('sass', function() {
  return gulp.src([
    './scss/app.scss'
  ])
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(sass({
    style: 'compressed',
    cacheLocation: './cache/.sass-cache'
  }))
  .pipe(gulp.dest('./dist/css/'))
});

// HTML
gulp.task('html', function() {
  return gulp.src([
    './src/index.html'
  ])
  .pip(gulp.dest('./dist/'))
});

gulp.task('default', ['watch', 'scripts']);

// Primary task to watch other tasks
gulp.task('watch', function() {
  // Watch JS
  gulp.watch(scriptsGlob, ['scripts']);

  // Watch Sass
  gulp.watch(['./scss/_mixins.scss', './scss/_styles.scss', './scss/app.scss'], ['sass']);

  // Watch HTML
  gulp.watch('./index.html', ['html']);
});

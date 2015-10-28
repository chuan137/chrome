'use strict';

var gulp        = require('gulp');
var cached      = require('gulp-cached');
var livereload  = require('gulp-livereload');
var print       = require('gulp-print');
var plumber     = require('gulp-plumber');
var sass        = require('gulp-ruby-sass');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var beep        = require('beepbeep')
var http        = require('http');
var https       = require('https');
var httpProxy   = require('http-proxy');
var fs          = require('fs');
var url         = require('url');

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
    .pipe(print())
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
  gulp.watch('./src/js/*.js', ['scripts']);

  // Watch Sass
  gulp.watch(['./scss/_mixins.scss', './scss/_styles.scss', './scss/app.scss'], ['sass']);

  // Watch HTML
  gulp.watch('./index.html', ['html']);
});

/*
 *gulp.task('reload', function() {
 *  gulp.src('')
 *  .pipe(open({ uri: 'http:reload.extensions' }));
 *});
 */

/*
 *  var proxy = httpProxy.createProxyServer({ ws: true });
 *  var server = httpProxy.createServer({
 *    ssl: {
 *      key: fs.readFileSync('ssl/key.pem', 'utf8'),
 *      cert: fs.readFileSync('ssl/cert.pem', 'utf8')
 *    },
 *    target: 'http://127.0.0.1:35728',
 *    secure: true
 *  }).listen(35729);
 *
 *  var server = http.createServer(function(req, res) {
 *    console.log(req.headers);
 *    proxy.web(req, res, { target: 'http://127.0.0.1:35728' });
 *  }).listen(35729);
 *  server.on('upgrade', function(req, res) {
 *    console.log(req.headers);
 *    proxy.ws(req, res, { target: 'http://127.0.0.1:35728' });
 *  });
 *
 *  var server = https.createServer({
 *    key: fs.readFileSync('ssl/key.pem', 'utf8'),
 *    cert: fs.readFileSync('ssl/cert.pem', 'utf8')
 *  }, function (req, res) {
 *    console.log(req.headers);
 *    proxy.web(req, res, { target: 'http://127.0.0.1:35728' });
 *  }).listen(35729);
 *  server.on('upgrade', function(req, res) {
 *    console.log(req.headers);
 *    proxy.ws(req, res, { target: 'http://127.0.0.1:35728' });
 *  });
 *
 *  // LiveReload
 *  livereload.listen({
 *    basePath: 'dist',
 *    port: 35728,
 *    //key: fs.readFileSync('ssl/key.pem', 'utf8'),
 *    //cert: fs.readFileSync('ssl/cert.pem', 'utf8')
 *  });
 *
 */
 

'use strict';

var gulp       = require('gulp');
var beep       = require('beepbeep')
var gutil      = require('gulp-util');
var plumber    = require('gulp-plumber');
var uglify     = require('gulp-uglify');
var sass       = require('gulp-ruby-sass');
var livereload = require('gulp-livereload');
var http       = require('http');
var https      = require('https');
var httpProxy  = require('http-proxy');
var fs         = require('fs');
var url        = require('url');

var onError = function (err) {
  beep([0, 0, 0]);
  gutil.log(gutil.colors.green(err));
};

// JS
gulp.task('uglify', function() {
  return gulp.src([
    './src/components/jquery/dist/jquery.min.js',
    './src/js/*.js'
  ])
  .pipe(plumber({
    errorHandler: onError
  }))
  //.pipe(uglify({
    //compress: false
  //}))
  .pipe(gulp.dest('./dist/js'))
  .pipe(livereload());
});

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
  .pipe(livereload());
});

// HTML
gulp.task('html', function() {
  return gulp.src([
    './src/index.html'
  ])
  .pip(gulp.dest('./dist/'))
  .pipe(livereload());
});

// Primary task to watch other tasks
gulp.task('yo', function() {
  //livereload.listen({port: 35729});

  // Watch JS
  gulp.watch('./src/js/*.js', ['uglify']);

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
 

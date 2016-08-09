//Initializing gulp.
var gulp = require('gulp');

//Loading plugins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');

//* Wildcard for checking all .js files in the folder.
var SRC = 'js/*.js';
var DEST = 'dist';

gulp.task('changed', function(){
  return gulp.src(SRC)
        .pipe(plumber())
        .pipe(changed(DEST))
        .pipe(gulp.dest(DEST));
});

gulp.task('default',['jshint']);

gulp.task('jshint', function(){
  gulp.src('js/main.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('monitor', function(){
  console.log('found a change in a .js file: process file....')
  gulp.watch(SRC,['changed']);
});

//Initializing gulp.
var gulp = require('gulp');

//Loading plugins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var concat = require('gulp-concat');

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

gulp.task('compress-images', function(){
    return gulp.src('img/*')
    .pipe(imagemin({optimizationLevel: 7}))
    .pipe(gulp.dest(DEST+'/img'));
});

gulp.task('minify-css', function(){
    return gulp.src('css/*')
    .pipe(cleanCSS())
    .pipe(gulp.dest(DEST + '/css'));
});

gulp.task('minify-js', function(){
   return gulp.src(SRC)
   .pipe(uglify())
   .pipe(gulp.dest(DEST + '/js'));
});

gulp.task('less', function(){
   gulp.src('less/*')
   .pipe(less()}))
   .pipe(gulp.dest(DEST + '/css2'))
});





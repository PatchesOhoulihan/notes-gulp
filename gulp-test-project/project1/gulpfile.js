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
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var babel = require('gulp-babel');

//* Wildcard for checking all .js files in the folder.
var src = {
    scss: 'fix',
    css:  'fix',
    html: 'fix'
};

var SRC = 'js/*.js';
var DEST = 'dist';

gulp.task('serve', ['less'], function(){
    browserSync.init({
       server:{
           baseDir: './'
       }  
    });
    gulp.watch("./less/*.less",['less'])
    gulp.watch("*.html").on('change', reload);
    gulp.watch("./js/*.js",['jshint']).on('change', reload);
});

gulp.task('babel', function(){
    gulp.src('./js/*.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('js2/babel.js'));
});

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
   .pipe(less())
   .pipe(concat('master.css'))
   .pipe(gulp.dest(DEST + '/css'))
   .pipe(gulp.dest('css'))
   .pipe(browserSync.stream());
});





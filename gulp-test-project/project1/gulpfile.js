//Initializing gulp.
var gulp = require('gulp');

//Loading plugins
var eslint = require('gulp-eslint');
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
var htmlhint = require("gulp-htmlhint");

//* Set Source Destination for Development Files.
var src = {
    less: 'fix',
    css:  'fix',
    html: 'fix'
};

var SRC = 'js/*.js';
var DEST = 'dist';

/*--------------------------------------------------------------------------
| Main Tasks
----------------------------------------------------------------------------*/

// gulp.task('default',['serve']);

gulp.task('default', ['validate-html','less','eslint','babel'], function(){
    browserSync.init({
       server:{
           baseDir: './'
       }
    });
    gulp.watch("./less/*.less",['less']);
    gulp.watch("*.html", ['validate-html']).on('change', reload);
    gulp.watch("./js/*.js",['eslint','babel']).on('change', reload);
});

/*--------------------------------------------------------------------------
| Development Tasks
----------------------------------------------------------------------------*/

gulp.task('babel', function(){
    return gulp.src(['./js/*.js', '!./js/main.js'])
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./js'));
});

gulp.task('changed', function(){
  return gulp.src(SRC)
        .pipe(plumber())
        .pipe(changed(DEST))
        .pipe(gulp.dest(DEST));
});

gulp.task('eslint', function(){
  return gulp.src('./js/*.js')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('monitor', function(){
  console.log('found a change in a .js file: process file....')
  gulp.watch(SRC,['changed']);
});

gulp.task('less', function(){
   return gulp.src('less/*')
   .pipe(plumber())
   .pipe(less())
   .pipe(concat('master.css'))
  //  .pipe(gulp.dest(DEST + '/css'))
   .pipe(gulp.dest('css'))
   .pipe(browserSync.stream());
});

gulp.task('validate-html', function(){
  return gulp.src("*.html")
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(gulp.dest(DEST));
});

/*--------------------------------------------------------------------------
| Build Production/Release Tasks
----------------------------------------------------------------------------*/

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

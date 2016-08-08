//Initializing the gulp object.
var gulp = require('gulp');

//Loading plugins
var jshint = require('gulp-jshint');

gulp.task('default',function(){

});

gulp.task('jshint', function(){
  gulp.src('js/main.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

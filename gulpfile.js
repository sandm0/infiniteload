
var gulp = require('gulp');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');

gulp.task('default', function() {
  var processors = [px2rem({remUnit: 64})];
  console.log(1);
  return gulp.src('./assets/styles/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./dest'));
});


// ===============

var gulp    = require('gulp');
var banner    = require('gulp-banner');
var concat    = require('gulp-concat');
var cleanCSS  = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sass    = require('gulp-ruby-sass');
var uglify    = require('gulp-uglify');
var pkg     = require('./package.json');
var pump    = require('pump');
var webserver = require('gulp-webserver');


// Default task
// gulp.task('default', ['concat', 'sass', 'uglify', 'webserver', 'watch']);
gulp.task('build', ['sass-app','build-app','minify-app']);


// ========================================== SASS =============================================


// Sass atendimento Task - Use to create sass task
gulp.task('sass-app', function() {
  console.log('         ');
  console.log('         ');
  console.log('========================= Build Started ======================');
    sass('**/*.scss')
        .on('error', sass.logError)
        .pipe(gulp.dest('www/css'));
});


// ========================================== CONCAT =============================================

// Concat atendimento files and Clean task
gulp.task('build-app',['sass-app'], function() {
  return gulp.src('www/css/*.css')
      .pipe(concat('app.css'))
      .pipe(gulp.dest('www/css'));
});

// ========================================== MINIFY =============================================

// Minify atendimento files and Clean task
gulp.task('minify-app',['build-app'], function() {
  return gulp.src('www/css/*.css')
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(concat('app.min.css'))
      .pipe(cleanCSS({
        keepSpecialComments: 0
      }))
      .pipe(sourcemaps.write('../maps'))
      .pipe(gulp.dest('www/css'));
});


// Uglify Task - Use to minify js files
// gulp.task('uglify', function() {
//  gulp.src('assets/_js/**/*.js')
//  .pipe(concat('app.min.js'))
//  .pipe(uglify())
//  .pipe(banner(comment, {
//    pkg: pkg
//  }))
//  .pipe(gulp.dest('assets/js/'))
// });


// Watch task - Use to watch change in your files and execute other tasks
gulp.task('watch', function() {
  console.log('         ');
  console.log('========================= Watch Started ======================');
  // gulp.watch(['assets/_js/**/*.js'], ['uglify']);
  gulp.watch(['**/*.scss'], ['build']);
  console.log('         ');
});
'use strict';
 
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Browser Sync
gulp.task('browser-sync', function() {
  browserSync.init({
    server: '.'
  });

  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('css/my-app.css').on('change', browserSync.reload);
  gulp.watch('js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync']);
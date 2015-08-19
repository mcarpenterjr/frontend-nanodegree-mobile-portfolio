var gulp = require('gulp'),
    fs = require('vinyl-fs');
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    minifycss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    htmlReplace = require('gulp-html-replace'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del');

gulp.task('configs', function() {
   return gulp.src('app/.htaccess')
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Configurations can has been Copied'}));
            ;
});

gulp.task('suffix', function() {
   return gulp.src(['app/**/*.html', '!node_modules/**/*.html'])
            .pipe(htmlReplace({
                'css': 'assets/styles/style.min.css',
                'js': 'assets/js/main.min.js'
            }))
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Suffixes can has been Suffixed'}));
            ;
});

gulp.task('html', function() {
    var opts = {
      conditionals: true
    };
   return gulp.src(['dist/**/*.html', '!node_modules/**/*.html'])
            .pipe(minifyHTML(opts))
            .pipe(htmlReplace({
                'css': 'assets/syles/style.min.css',
                'js': 'assets/js/main.min.js'
            }))
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'HTMLS can has been Minified' }));
            ;
});

gulp.task('styles', function() {
   return gulp.src(['app/css/**/*.css', '!node_modules/**/*.css'])
            .pipe(autoprefixer('last 2 version'))
            .pipe(gulp.dest('dist/assets/styles'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest('dist/assets/styles'))
            .pipe(notify({ message: 'Styles have been Minified' }));
});

gulp.task('scripts', function() {
   return gulp.src(['app/js/**/*.js', '!node_modules/**/*.js'])
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            .pipe(gulp.dest('dist/assets/js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/assets/js'))
            .pipe(notify({ message: 'Scripts have been Linted, Concated and Uglified' }));
});

gulp.task('images', function() {
   return gulp.src(['app/img/**/*', '!node_modules/**/*'])
            .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
            .pipe(gulp.dest('dist/assets/img'))
            .pipe(notify({ message: 'Images have been Optimized' }));
});

gulp.task('clean', function(cb) {
   del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb);
});

gulp.task('watch', function() {
   //Watch for .html files
   gulp.watch('app/**/*.html', ['build']);
   //Watch for .css files
   gulp.watch('app/css/**/*.css', ['styles']);
   //Watch for .js files
   gulp.watch('app/js/**/*.js', ['scripts']);
   //Watch for image files
   gulp.watch('app/img/**/*', ['build']);
});

gulp.task('default', ['clean'], function() {
   runSequence(
        ['suffix'],
        ['styles', 'scripts'],
        'images',
        ['html'],
        ['watch']
    ); 
});

gulp.task('distro', ['clean'], function() {
   runSequence(
        ['suffix', 'configs'],
        ['styles', 'scripts'],
        'images',
        ['html']
    ); 
});

gulp.task('serve', ['default'], function () {
  browserSync({
      port:5000,
    notify: false,
    logPrefix: 'PSK', 
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['distro'], function () {
  browserSync({
    port:5001,
    notify: false,
    logPrefix: 'PSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});
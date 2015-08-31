var gulp = require('gulp'),
    fs = require('vinyl-fs');
    autoprefixer = require('gulp-autoprefixer'),
    runSequence = require('run-sequence'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    htmlReplace = require('gulp-html-replace'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    webFonts = require('gulp-google-webfonts'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del');
    
var paths = {
    restricted: ['!node_modules/**/*.html'],
    serverConfigs: ['app/serverConfigs/*'],
    fonts: ['app/serverConfigs/fonts.list'],
    content: ['app/*.html'],
    contentViews: ['app/views/*.html'],
    styles: ['app/css/**/*.css'],
    cssFonts: ['app/css/'],
    cssWofFonts: ['app/css/*.woff'],
    stylesViews: ['app/views/css/**/*.css'],
    scripts: ['app/js/**/*.js'],
    scriptsViews: ['app/views/js/**/*.js'],
    img: ['app/img/**/*'],
    imgViews: ['app/views/images/**/*']
};


    // The configs task copies all server configuration files to the 
    // root location. Place server config files in the app/serverConfigs/.
    // directory. Apache .htaccess files must be stored as htaccess. then
    // manually renamed after task is run.
    
gulp.task('configs', function() {
    return gulp.src(paths.serverConfigs, paths.restricted)
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'Server Configurations are set!'}));
});

    //  The html task minifies the html documents, it is currently set
    //  to strip comments and white space creating the smallest document
    //  possible.

gulp.task('htmlMain', function() {
    var opts = {
      conditionals: true
    };
    return gulp.src(paths.content, paths.restricted)
            .pipe(htmlReplace({
                'cssMainNow': {
                   src: 'css/style.min.css',
                   tpl: '<link rel="stylesheet" href="%s">'
                },
                'cssMainAsync': {
                   src: ['css/print.min.css', 'css/fonts.min.css']},
                'jsMain': {
                    src: 'js/main.min.js',
                    tpl: '<script async src="%s"></script>'
                }
            }))
            .pipe(minifyHTML(opts))
            .pipe(gulp.dest('dist/'))
            .pipe(notify({ message: 'HTMLS can has been Minified' }));
});

gulp.task('htmlViews', function() {
    var opts = {
      conditionals: true
    };
    return gulp.src(paths.contentViews, paths.restricted)
            .pipe(htmlReplace({
                'cssViewsNow': {
                    src: 'css/style-views.min.css',
                    tpl: '<link rel="stylesheet" href="%s">'
                },
                'cssViewsAsync': {
                    src: ['css/print.min.css', 'css/fonts.min.css']},
                'jsViews': {
                    src: 'js/main-views.min.js',
                    tpl: '<script src="%s"></script>'
                }
            }))
            .pipe(minifyHTML(opts))
            .pipe(gulp.dest('dist/views/'))
            .pipe(notify({ message: 'HTMLSViews can has been Minified' }));
});

gulp.task('content', function () {
    runSequence(
        ['htmlMain', 'htmlViews']
    );
});

    //  The stylesMain task minifies and combines all css files in the
    //  app directory.

gulp.task('stylesMain', function() {
    return gulp.src(paths.styles, paths.restricted)
            .pipe(autoprefixer('last 2 version'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifyCss())
            .pipe(gulp.dest('dist/css/'))
            .pipe(notify({ message: 'Styles have been Minified' }));
});

    //  The stylesView task minifies and combines all css files in the
    //  view directory into one file, this preserves existing style in the
    //  main css file.

gulp.task('stylesViews', function() {
    return gulp.src(paths.stylesViews, paths.restricted)
            .pipe(autoprefixer('last 2 version'))
            .pipe(concat('style-views.css'))
            .pipe(minifyCss())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('dist/views/css/'))
            .pipe(notify({ message: 'View Styles have been Minified' }));
});

    // The fonts task generates a style sheet for the google fonts API
    // This places a fonts.css file in the app/css directory.
    // THIS MUST BE RUN BEFORE ANY OF THE STYLES____ TASKS!
    
gulp.task('fonts', function() {
    return gulp.src(paths.fonts, paths.restricted)
            .pipe(webFonts())
            .pipe(gulp.dest('app/css/'))
            .pipe(notify({ message: 'WE GOT FONTS YO!'}));
});

    //  The wofFiles task copies .woff files containing font information to the
    //  CSS directory where they can be referenced by fonts.css.

gulp.task('wofFiles', function() {
    return gulp.src(paths.cssWofFonts, paths.restricted)
            .pipe(gulp.dest('dist/css/'))
            .pipe(notify({ message: 'WOFF FILES ARE IN!'}));
});

gulp.task('styles', function () {
    runSequence(
            ['wofFiles'],
            ['fonts'],
            ['stylesMain', 'stylesViews']
    );
});

    //  The scripts task lints, concats and uglifies all js scripts and
    //  combines them into one file.

gulp.task('scriptsMain', function() {
   return gulp.src(paths.scripts, paths.restricted)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'))
            .pipe(notify({ message: 'Scripts have been Linted, Concated and Uglified' }));
});

gulp.task('scriptsViews', function() {
   return gulp.src(paths.scriptsViews, paths.restricted)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(concat('main-views.js'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify({mangle: false}))
            .pipe(gulp.dest('dist/views/js/'))
            .pipe(notify({ message: 'View Scripts have been Linted, Concated and Uglified' }));
});

gulp.task('scripts', function () {
    runSequence(
        ['scriptsMain', 'scriptsViews']
    );
});

gulp.task('imagesMain', function() {
   return gulp.src(paths.img, paths.restricted)
            .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
            .pipe(gulp.dest('dist/img/'))
            .pipe(notify({ message: 'That image LOOKS AMAZING!' }));
});

gulp.task('imagesViews', function() {
   return gulp.src(paths.imgViews, paths.restricted)
            .pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
            .pipe(gulp.dest('dist/views/images/'))
            .pipe(notify({ message: 'That image LOOKS AMAZING!' }));
});

gulp.task('images', function() {
   runSequence(
        ['imagesMain', 'imagesViews']
    ); 
});

gulp.task('clean', function(cb) {
   del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img',
       'dist/views/assets/css', 'dist/views/assets/js', 
       'dist/views/assets/img'], cb);
});

gulp.task('watch', function() {
   //Watch for .html files
   gulp.watch('app/**/*.html', ['assetRef', 'html']);
   //Watch for .css files
   gulp.watch('app/css/**/*.css', ['stylesMain']);
   gulp.watch('app/views/css/**/*.css', ['stylesViews']);
   //Watch for .js files
   gulp.watch('app/js/**/*.js', ['scriptsMain']);
   gulp.watch('app/views/js/**/*.js', ['scriptsViews']);
   //Watch for image files
   gulp.watch('app/img/**/*', ['imagesMain']);
   gulp.watch('app/views/img/**/*', ['imagesViews']);
});

gulp.task('default', ['clean'], function() {
   runSequence(
        ['styles', 'scripts'],
        ['images'],
        ['content'],
        ['configs']
    ); 
});

// This builds the distibution copy of the web application, and then serves it
//  to a basic server, from the specified location.

gulp.task('serve', ['default', 'watch'], function () {
  browserSync({
      port:5000,
    notify: false,
    logPrefix: 'PSK', 
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: {
      baseDir: ['.tmp', 'dist']
    }
  });
});

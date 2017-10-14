var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var imagemin = require('gulp-imagemin');

var config = {
  src:  'src',
  dist: 'dist'
}

gulp.task('minify', function() {
  return gulp.src(config.src+'/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.stream());
});

gulp.task('scss', function () {
  return gulp.src(config.src+'/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist+'/assets/css/'))
    .pipe(browserSync.stream());
});

function bundle (bundler) {
  bundler
    .bundle()
    .pipe(source(config.src+'/js/main.js'))
    .pipe(buffer())
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist+'/assets/js/'));
}

gulp.task('js', function () {
  const bundler = browserify(config.src+'/js/main.js')
    .transform(babelify, {
      presets : ['es2015']
    });
  bundle(bundler);
});

gulp.task('minimages', () =>
	gulp.src(config.src+'/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.dist+'/assets/img'))
);

gulp.task('watch', function() {
  browserSync.init({
    server: './'+config.dist
  });
  gulp.watch(config.src+'/*.html', ['minify']);
  gulp.watch(config.src+'/scss/**/*.scss', ['scss']);
  gulp.watch(config.src+'/js/**/*.js', ['js']);
});

gulp.task('default', ['watch', 'minify', 'scss', 'js', 'minimages']);

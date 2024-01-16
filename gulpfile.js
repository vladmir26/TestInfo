const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();


const paths = {
  root: './dist',
  templates: {
    src: './src/**/*.pug',
    dest: './dist/',
  },
  styles: {
    src: './src/**/*.scss',
    dest: './dist/',
  },
  images: {
    src: './src/image/**/*',
    dest: './dist/images/',
  },
};

function server() {
  browserSync.init({
    server: paths.root,
  });
  browserSync.watch(`${paths.root}/**/*.*`, browserSync.reload);
}


function templates() {
  return gulp.src(paths.templates.src)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
}

exports.templates = templates;
exports.styles = styles;
exports.images = images;

gulp.task(
  'build',
  gulp.series(
    gulp.parallel(styles, templates, images),
  ),
);

gulp.task(
  'start',
  gulp.series(
    gulp.parallel(watch, server),
  ),
);

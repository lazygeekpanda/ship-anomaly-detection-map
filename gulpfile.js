const { src, dest, watch, series } = require('gulp');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');

const rename = require('gulp-rename');

const cleanCSS = require('gulp-clean-css');
const stripCssComments = require('gulp-strip-css-comments');

const options = require('./config');

const tailwdincss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

function css() {
  return (
    src('./src/**/*.css')
      .pipe(postcss([tailwdincss(options.config.tailwindjs), autoprefixer()]))
      .pipe(
        stripCssComments({
          preserve: false,
        })
      )
      .pipe(cleanCSS(require('./clean-css.js')))
      // Output
      .pipe(dest('./dist'))
  );
}

function scripts() {
  return (
    src('./src/**/*.js')
      // Minify the file
      .pipe(uglify())
      .pipe(
        rename({
          suffix: '.min',
        })
      )
      // Output
      .pipe(dest('./dist/js'))
  );
}

exports.default = function () {
  watch([options.config.tailwindjs, './src/**/*.css'], series(css));
  watch('./src/**/*.js', series(scripts));
};

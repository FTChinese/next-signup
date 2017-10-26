const pify = require('pify');
const path = require('path');
const gulp = require('gulp');
const cssnext = require('postcss-cssnext');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps');

const rollup = require('rollup').rollup;
const minify = require('rollup-plugin-babel-minify');
const babel = require('rollup-plugin-babel');
const bowerResolve = require('rollup-plugin-bower-resolve');

const publicDir = 'public';

// change NODE_ENV between tasks.
gulp.task('prod', function() {
  return Promise.resolve(process.env.NODE_ENV = 'production');
});

gulp.task('dev', function() {
  return Promise.resolve(process.env.NODE_ENV = 'development');
});

gulp.task('styles', function styles() {
  const dest = `${publicDir}/styles`;
  const isProduction = process.env.NODE_ENV === 'production'
  
  return gulp.src('client/main.scss')
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sass({
      outputStyle: isProduction ? 'compressed' : 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', (err) => {
      console.log(err);
    }))
    // .pipe(postcss([
    //   cssnext({
    //     features: {
    //       colorRgba: false
    //     }
    //   })
    // ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
});

let cache;
gulp.task('scripts', async () => {
  const inputOptions = {
    context: 'window',
    input: 'client/main.js',
    plugins: [
      bowerResolve(),
      babel({
        exclude: 'node_modules/**'
      })
    ],
    cache: cache
  };
  const outputOptions = {
    file: 'public/scripts/main.js',
    format: 'iife',
    sourcemap: true
  };

  if (process.env.NODE_ENV === 'production') {
    inputOptions.plugins.push(minify());
  }

  const bundle = await rollup(inputOptions);
  console.log('Bundle modules:\n' +bundle.modules.map(m => m.id).join('\n'));

  return bundle.write(outputOptions);
});

gulp.task('serve', gulp.parallel('styles', 'scripts', () => {
  gulp.watch('client/**/*.js', gulp.parallel('scripts'));
  gulp.watch('client/**/*.scss', gulp.parallel('styles'));
}));
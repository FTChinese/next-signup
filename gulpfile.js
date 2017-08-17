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

const buildPage = require('./utils/build-page.js');

const publicDir = 'public';

// change NODE_ENV between tasks.
gulp.task('prod', function() {
  return Promise.resolve(process.env.NODE_ENV = 'production');
});

gulp.task('dev', function() {
  return Promise.resolve(process.env.NODE_ENV = 'development');
});


gulp.task('html', () => {
  return buildPage()
    .catch(err => {
      console.log(err);
    });  
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
    .pipe(postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest));
});

let cache;
gulp.task('scripts', () => {
  const config = {
    context: 'window',
    entry: 'client/main.js',
    plugins: [
        bowerResolve(),
        babel({
          exclude: 'node_modules/**'
        })
    ],
    cache: cache,
  }
  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(minify());
  }
  return rollup(config).then(bundle => {
    cache = bundle;
    return bundle.write({
        format: 'iife',
        dest: 'public/scripts/main.js',
        sourceMap: true,
    })
  })
  .catch(err => {
    console.log(err);
  });
});

gulp.task('serve', gulp.parallel('styles', 'scripts', () => {
  gulp.watch('client/**/*.js', gulp.parallel('scripts'));
  gulp.watch('client/**/*.scss', gulp.parallel('styles'));
}));

gulp.task('build', gulp.series('prod', 'styles', 'scripts', 'html', () => {
  const dest = path.resolve(process.env.HOME, 'svnonline/dev_www/frontend/tpl/phone');
  console.log(`Copy to ${dest}`);
  return gulp.src('public/*.html')
    .pipe(gulp.dest(dest));
}));



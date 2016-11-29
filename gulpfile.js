const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const cssnext = require('postcss-cssnext');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('styles', function styles() {
  const DEST = 'public/styles';

  return gulp.src('client/main.scss')
    .pipe($.changed(DEST))
    .pipe($.plumber())
    .pipe($.sourcemaps.init({loadMaps:true}))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['bower_components']
    }).on('error', $.sass.logError))
    .pipe($.postcss([
      cssnext({
        features: {
          colorRgba: false
        }
      })
    ]))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(DEST));
});

gulp.task('webpack', (done) => {
  if (process.env.NODE_ENV === 'prod') {
    delete webpackConfig.watch;
  }

  webpack(webpackConfig, function(err, stats) {
    if (err) throw new $.util.PluginError('webpack', err);
    $.util.log('[webpack]', stats.toString({
      colors: $.util.colors.supportsColor,
      chunks: false,
      hash: false,
      version: false
    }));
    done();
  });
});

const rollup = require('rollup').rollup;
const buble = require('rollup-plugin-buble');
const bowerResolve = require('rollup-plugin-bower-resolve');
const uglify = require('rollup-plugin-uglify');
var cache;

gulp.task('rollup', () => {
    return rollup({
        context: 'window',
        entry: 'client/main-account.js',
        plugins: [
            bowerResolve(),
            buble(),
            uglify()
        ],
        cache: cache,
    }).then(function(bundle) {
        cache = bundle;
        return bundle.write({
            format: 'iife',
            dest: 'public/scripts/main-account.js',
            sourceMap: true,
        }).then(function() {
            console.log('done');
        });
    });
});


gulp.task('serve', gulp.parallel('styles', 'webpack', () => {
  gulp.watch('client/**/*.scss', gulp.parallel('styles'));
}));
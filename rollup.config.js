const minify = require('rollup-plugin-babel-minify');
const babel = require('rollup-plugin-babel');
const bowerResolve = require('rollup-plugin-bower-resolve');

export default {
  context: 'window',
  entry: 'client/main.js',
  plugins: [
    bowerResolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    minify()
  ],
  targets: [
    {
      dest: 'public/scripts/main.js',
      format: 'iife',
    }
  ]
};
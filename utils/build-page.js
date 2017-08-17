const pify = require('pify');
const path = require('path');
const fs = require('fs-jetpack');
const inline = pify(require('inline-source'));
const htmlMin = require('html-minifier').minify;
const tpl = require('./template.js');
const publicDir = 'public';

async function buildPage(name='register.html') {
  const isProduction = process.env.NODE_ENV === 'production'

  let html = await tpl.render(name, { isProduction });

  if (isProduction) {
    html = await inline(html, {
      compress: true,
      rootpath: path.resolve(__dirname, `../${publicDir}`)
    });

    html = htmlMin(html, {
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    });
  }

  const dest = path.resolve(__dirname, `../${publicDir}/register-native-app.html`);
  await fs.writeAsync(dest, html);
}

if (require.main === module) {
  buildPage()
    .catch(err => {
      console.log(err);
    });
}

module.exports = buildPage;
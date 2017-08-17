const path = require('path');
const nunjucks = require('nunjucks');

class Template {
  constructor() {
    this.watch = false;
    this.noCache = process.env.NODE_ENV === 'production' ? false : true;
    this.autoescape = true;
    this.throwOnUndefined = false;
    this.trimBlocks = false;
    this.lstripBlocks = false;
  }

  get env() {
    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(
        [
          path.resolve(process.cwd(), 'views')
        ],
        {watch: this.watch, noCache: this.noCache}
      ),
      {
        autoescape: this.autoescape,
        throwOnUndefined: this.throwOnUndefined,
        trimBlocks: this.trimBlocks,
        lstripBlocks: this.lstripBlocks
      }
    );
    return env;
  }

  render(template, context) {
    return new Promise((resolve, reject) => {
      this.env.render(template, context, function(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}
module.exports = new Template();
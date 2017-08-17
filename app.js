const debug = require('debug')('signup:home');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const signup = require('./server/signup.js');
const check = require('./server/check.js');

// Listen on process error
process.on('warning', (warning) => {
  debug(`Warning name: ${warning.name}`);
  debug(`Warning message: ${warning.message}`);
  debug(`Warning stack: ${warning.stack}`);
  process.exit(1);
});

// Create variables
const app = new Koa()
const router = new Router();
const appName = 'Next Signup';
debug('booting %s', appName);
const port = process.env.PORT || 3000;

// Add middleware
app.use(logger());
if (process.env.NODE_ENV === 'development') {
  const serve = require('koa-static');
  app.use(serve(path.resolve(process.cwd(), 'public')));
}
app.use(bodyParser());

// Routers
router.use('/signup', signup.routes());
router.use('/index.php/users', check.routes());
app.use(router.routes());

// Startup
const server = app.listen(port)
server.on('error', (error) => {
  debug(`Server error: %O`, error);
});
server.on('listening', () => {
  debug(`${appName} running on %o`, server.address());
});
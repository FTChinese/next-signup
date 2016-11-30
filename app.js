const serve = require('koa-static');
const koa = require('koa');
const app = koa();
const logger = require('koa-logger');
const mount = require('koa-mount');
const error = require('koa-error');
const bodyParser = require('koa-bodyparser');
const render = require('./helper/render.js');

const signup = require('./routes/signup.js');
const check = require('./routes/check.js')

app.use(serve('public', {
	index: false
}));

app.use(logger());
app.use(bodyParser());

app.use(mount('/', signup));
app.use(mount('/check', check));

const server = app.listen(process.env.PORT || 3000)
server.on('listening', () => {
	console.log(`Client listening on port ${process.env.PORT || 3000}`);
});
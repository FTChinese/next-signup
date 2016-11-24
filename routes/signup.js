const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

const render = require('../helper/render');

router.get('/', function *(next) {

	this.body = yield render('signup.html');
});

router.post('/', function *() {
	console.log(this.request.body);

	this.body = Object.assign({status: 'ok'}, this.request.body);
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;
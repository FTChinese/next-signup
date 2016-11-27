const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

router.post('/', function *(next) {
	console.log(this.request.body);
	const body = this.request.body

	this.set('Content-Type', 'application/json');

	if (body.email === 'test@example.org') {
		this.body = {emailExists: true};
	} else {
		this.body = {emailExists: false};
	}
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;
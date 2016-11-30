const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

const render = require('../helper/render');

router.get('/', function *(next) {

	this.body = yield render('signup.html');
});

router.get('/register', function *(next) {
	this.body = yield render('register.html');
})

router.post('/signup', function *() {
	console.log(this.request.body);

	this.body = Object.assign({submitSucceeds: true}, this.request.body);
	console.log(this.body);
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;
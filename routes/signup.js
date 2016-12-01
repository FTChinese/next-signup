const querystring = require('querystring');
const koa = require('koa');
const app = koa();

const Router = require('koa-router');
const router = new Router();

const render = require('../helper/render');



router.get('/', function *(next) {
	this.body = yield render('register.html', {
		dev: false
	});
});

router.get('/signup', function *(next) {

	this.body = yield render('signup.html', {
		dev: true
	});
});

router.get('/profile', function *(next) {
	this.body = yield render('profile.html', {
		dev: true
	});
});

router.get('/index.php/users//checkemailexists', function *(next) {
	const query = querystring.parse(this.querystring);
	if (query.e === 'test@example.org') {
		this.body = 'yes';
	} else {
		this.body = 'no';
	}	
});

router.post('/signup', function *() {
	console.log(this.request.body);

	this.body = Object.assign({submitSucceeds: true}, this.request.body);
	console.log(this.body);
});

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;
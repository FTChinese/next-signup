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

router.post('/index.php/users/registeruser/ajax', function *() {
	console.log(this.request.body);
	this.cookies.set('userId','aldsfjalje9ruupadfsu302');
	this.body = Object.assign({
		submitSucceeds: true,
		userId: 'aldsfjalje9ruupadfsu302'
	}, this.request.body);
	console.log(this.body);
});

router.get('/steal-cookie', function *(next) {
	const query = querystring.parse(this.querystring);
	console.log(query);
})

app
	.use(router.routes())
	.use(router.allowedMethods());

module.exports = app;
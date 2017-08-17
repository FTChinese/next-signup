const debug = require('debug')('signup:home');
const querystring = require('querystring');
const Router = require('koa-router');
const router = new Router();

router.post('/', async function (ctx, next) {
	console.log(this.request.body);
	const body = this.request.body

	this.set('Content-Type', 'application/json');

	if (body.email === 'test@example.org') {
		this.body = {emailExists: true};
		console.log(this.body);
	} else {
		this.body = {emailExists: false};
	}
});

// In this form `/index.php/users//checkemailexists?e=test@example.org`
router.get('//checkemailexists', async function (ctx, next) {
	const query = querystring.parse(ctx.request.querystring);

	if (query.e === 'test@example.org') {
		ctx.body = 'yes';
	} else {
		ctx.body = 'no';
	}	
});

router.post('/registeruser/ajax', async function (ctx, next) {
	console.log(ctx.request.body);
	
	ctx.cookies.set('userId','aldsfjalje9ruupadfsu302');

	ctx.cookies.set('USER_NAME', 'test@exampl.org', {
		maxAge: 30 * 60 * 1000,
		path: '/',
		overwrite: true,
		httpOnly: false
	});

	ctx.body = Object.assign({
		submitSucceeds: true,
		msg: 'failed',
		userId: 'aldsfjalje9ruupadfsu302'
	}, ctx.request.body);
});

module.exports = router;
const debug = require('debug')('signup:home');
const Router = require('koa-router');
const router = new Router();

const tpl = require('../utils/template.js');

router.get('/', async function (ctx, next) {
	ctx.body = await tpl.render('register.html');
});





// router.get('/steal-cookie', function *(next) {
// 	const query = querystring.parse(this.querystring);
// 	console.log(query);
// })

module.exports = router;
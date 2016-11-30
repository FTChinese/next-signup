import 'promise-polyfill';
import 'fetch';

import FormValidator from './js/form-validator.js';
import ShowPassword from './js/show-password.js';
import SignupForm from './js/signup-form.js';

FormValidator.init();
ShowPassword.init();
SignupForm.init();

function recordAction(type, category) {
	try {
		ga('send', 'event', type, category, window.FTStoryid);
	} catch(err) {
		console.log('send', 'event', type, category)
	}
}
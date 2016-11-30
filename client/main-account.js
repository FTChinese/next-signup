import 'promise-polyfill';
import 'fetch';

import FormValidator from './js/form-validator.js';
import ShowPassword from './js/show-password.js';
import SignupForm from './js/signup-form.js';
import Tracker from './js/tracker.js';

FormValidator.init();
ShowPassword.init();
SignupForm.init();
new Tracker({
	selector: '#signupForm'
});

// function recordAction(type, category) {
// 	try {
// 		ga('send', 'event', type, category, window.FTStoryid);
// 	} catch(err) {
// 		console.log('send', 'event', type, category)
// 	}
// }
// Submit Registration
// Select Gender
// Select Industry
// Select Responsibility
// Select Position
// Uncheck mail_today_focus
// Unckeck mail_week_selects
// Unckeck mial_afternoon_express
// Save Profile
// ga('send', {
// 	hitType: 'event',
// 	eventCategory: 'signup',
// 	eventAction: 'Select Gender'

// })
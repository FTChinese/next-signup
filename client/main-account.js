import Promise from 'promise-polyfill';
if (!window.Promise) {
	window.Promise = Promise;
}

import FormValidator from './js/form-validator.js';
import ShowPassword from './js/show-password.js';
import SignupForm from './js/signup-form.js';
import UnityInput from './js/unity-input.js';

FormValidator.init();
ShowPassword.init();
SignupForm.init();

new UnityInput('#unityInput', {
	form: '#signupForm'
});

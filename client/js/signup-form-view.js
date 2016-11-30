import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import {postData, submitForm} from './helper.js';

class SignupFormView {
	constructor (selector) {
		this.signUpFormValidator = new FormValidator({
			selector: '#signupForm'
		});

		this.form = new UiItem({
			selector: '#signupForm'
		});

		this.profileForm = new UiItem({
			selector: '#profileForm'
		});

		this.emailExistsStatusBox = new UiItem({
			selector: '#emailExistsStatusBox'
		});

		this.email = new UiItem({
			selector: '#emailField'
		});

		this.password = new UiItem({
			selector: '#passwordField'
		});

		this.submitBtn = new UiItem({
			selector: '#signUpSubmitBtn'
		});
	}

	onEnteringAnEmail (callback) {
		this.email.onValueChanged((target) => {
			callback(target);
		});
	}

	onSubmitting(callback) {
		this.form.onSubmit((target) => {
			callback(target);
		});
	}

	static init () {
		new SignupForm();
	}
}

export default  new SignupFormView();
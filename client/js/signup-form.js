import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import view from './signup-form-view.js';

import onEnteringAnEmail from './on-entering-an-email.js';
import onSubmittingSignup from './on-submitting-signup.js';

class SignupForm {
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
			selector: '#signUpSubmitButton'
		});

		this.email.input.addEventListener('change', (event) => {
			this.onEnterEmail();
		});

		this.form.element.addEventListener('submit', (event) => {
			event.preventDefault();
			this.onSubmit();
		});
	}

	emailIsValid () {
		return this.signUpFormValidator.validate(this.email.input, {
			silently: true
		});
	}

	onEnterEmail() {
		this.emailExistsStatusBox.removeFromDisplay();

		if(this.emailIsValid()) {
			this.ensureEmailNotExist()
				.catch(error => {
					if (error) {
						console.log(error);
					}
				});
		}
	}

	ensureEmailNotExist () {
		const inputEl = this.email.input
		const url = inputEl.getAttribute('data-checkurl');
		const data = {};
		data[inputEl.name] = inputEl.value;

		return postData(url, data)
			.then(response => {
				if (response.emailExists) {
					this.emailExistsStatusBox.display();
					return Promise.reject('Email taken');
				}
			});
	}

	onSubmit () {

		const self = this;

		return Promise.resolve()
			.then(sanitiseUserInput)
			.then(ensureFormIsValid)
			.catch(error => {
				return Promise.reject('form is not valid');
			})
			.then(() => {
				return this.ensureEmailNotExist();
			})
			.catch(error => {
				return Promise.reject('email taken');
			})
			.then(() => {
				return submitForm(self.form.element)
			})
			.catch(error => {
				return Promise.reject('Submit failed');
			})
			.then(() => {
				this.form.removeFromDisplay();
				this.profileForm.display();
			})
			.catch(error => {
				if (error) {
					console.log(error);
				}
			});

		function sanitiseUserInput () {
			self.signUpFormValidator.sanitiseForm();
		}
		function ensureFormIsValid () {

			const formIsValid = self.signUpFormValidator.validateForm();
			if(!formIsValid) {
				return Promise.reject();
			}
		}	
	}

	static init () {
		view.onEnteringAnEmail((target) => {
			console.log(target);
			onEnteringAnEmail();
		});

		view.onSubmitting((target) => {
			console.log(target);
			onSubmittingSignup();
		});
	}
}

export default SignupForm;
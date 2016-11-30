import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import {postData, submitForm} from './helper.js';

class SignupForm {
	constructor (selector) {
		this.form = document.getElementById('signupForm');
		this.nextForm = document.getElementById('profileForm');

		this.signUpFormValidator = new FormValidator({
			selector: '#signupForm'
		});

		this.ui = new UiItem({
			selector: '#signupForm'
		})

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

		this.profileForm = new UiItem({
			selector: '#profileForm'
		});

		console.log(this.email.input);
		this.email.input.addEventListener('change', (event) => {
			this.onEnterEmail();
		});

		this.form.addEventListener('submit', (event) => {
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
			.then(() => {
				return this.ensureEmailNotExist();
			})
			.catch(error => {
				if (error) {
					console.log(error);
				}
			})
			.then(() => {
				return submitForm(self.form)
			})
			.catch(error => {
				if (error) {console.log(error);}
			})
			.then(() => {
				this.profileForm.display();
				this.ui.removeFromDisplay();
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

	// proceedToNext() {
	// 	this.form.classList.add('su-form--not-displayed');
	// 	this.nextForm.classList.remove('su-form--not-displayed');
	// }

	static init () {
		new SignupForm();
	}
}

export default SignupForm;
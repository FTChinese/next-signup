import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import serialize from './serialize.js';
import {postData} from './helper.js';

class SignupForm {
	constructor (selector) {
		this.form = document.getElementById('signupForm');

		this.signUpFormValidator = new FormValidator({
			selector: '#signupForm'
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
			this.onEnteringAnEmail();
		});

		this.form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.onClickingTheSubmitBtn();
		});
	}

	emailIsValid () {
		return this.signUpFormValidator.validate(this.email.input, {
			silently: true
		});
	}

	onEnteringAnEmail() {

		this.emailExistsStatusBox.removeFromDisplay();

			if(this.emailIsValid()) {
				const url = this.email.input.getAttribute('data-checkurl');
				console.log('checking remote');
				postData(url, {email: this.email.value})
				.then((response) => {
					console.log(response);
					if (response.emailExists) {
						this.emailExistsStatusBox.display();
					}
			});
		}
	}

	onClickingTheSubmitBtn () {
		const the = {
			formIsInvalid: false,
			userExistsAlready: false,
			userCheckFailed: false,
			formSubmissionFailed: false
		};
		const self = this;

		return Promise.resolve()
		.then(sanitiseUserInput)
		.then(ensureThatSignupFormIsValid)
		.then(ensureThatEmailDoesNotAlreadyExist)
		.then(submitSingupForm)
		.catch(error => {
			if (error) {
				console.log(error);
			}
		});

		function sanitiseUserInput () {
			self.signUpFormValidator.sanitiseForm();
		}
		function ensureThatSignupFormIsValid () {

			const formIsValid = self.signUpFormValidator.validateForm({silently:true});
			if(!formIsValid) {
				the.formIsInvalid = true;
				return Promise.reject();
			}
		}

		function ensureThatEmailDoesNotAlreadyExist () {
			const url = self.email.input.getAttribute('data-checkurl');
			return postData(url, {
					email: self.email.value
				})
				.then(response => {
					if (response.emailExists) {
						the.userExistsAlready = true;
						return Promise.reject();
					}
				})
				.catch(error => {
					the.userCheckFailed = true;
					return Promise.reject(error);
				});
		}

		function submitSingupForm () {
			const formData = serialize(self.form, {
				hash: true,
				empty: true
			});
			const url = self.form.action;
			formData.id = self.form.id;

			return postData(url, formData)
				.then(response => {
					if (response.submitFailed) {
						the.formSubmissionFailed = true;
						self.showStatus();
						return Promise.reject();
					}
				})
				.catch(error => {
					return Promise.reject(error);
				});
		}	
	}

	showStatus() {
		const statusBox = document.getElementById('generalStatusBox');
		statusBox.classList.add('error');
	}

	static init () {
		new SignupForm();
	}
}

export default SignupForm;
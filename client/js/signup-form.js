import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import serialize from './serialize.js';

const store = {
	nextPageUrl: '/thank-you'
};

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

		this.generalStatusBox = new UiItem({
			selector: '#generalStatusBox'
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
		.then(hideAllStatusMessages)
		.then(sanitiseUserInput)
		.then(ensureThatSignupFormIsValid)
		.then(ensureThatEmailDoesNotAlreadyExist)
		.then(submitSingupForm)
		.then(showThankYou)
		.catch(error => {
			console.log(error);
		});

		function hideAllStatusMessages () {
			self.hideGeneralErrorMessage();
		}
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
		function showAllValidationErrorsOnForm () {
			self.signUpFormValidator.validateForm();
		}

		function submitSingupForm () {
			const formData = serialize(self.form, {
				hash: true,
				empty: true
			});
			const url = self.form.action;
			formData.id = self.form.id;

			return postData(url, formData);
		}

		function showThankYou() {
			document.getElementById('thankYou').setAttribute('aria-hidden', 'false');
			self.form.setAttribute('aria-hidden', 'true');
		}		
	}

	showGeneralErrorMessage (message) {
		this.generalStatusBox.displayError(message);
	}

	hideGeneralErrorMessage () {
		this.generalStatusBox.removeFromDisplay();
	}

	static init () {
		new SignupForm();
	}
}

function postData(url, data) {
	return 	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log('Getting response from server');
		return response.json();
	});
}
export default SignupForm;
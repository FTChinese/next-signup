import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import {submitUserData} from './user-api.js';
import docCookie from './cookie.js';

const SYSTEM_DOWN = '很抱歉，服务器遇到一些技术问题，请稍后再试';

class SignupForm {
	constructor (selector) {

		this.form = document.querySelector(selector);


		this.signupFormValidator = new FormValidator(this.form);

		this.formUi = new UiItem({
			selector: this.form
		});

		this.url = this.form.action;

		this.nextForm = new UiItem({
			selector: '#profileForm'
		});

		this.submitBtn = new UiItem({
			selector: '#signUpSubmitBtn'
		});

		this.generalStatusBox = new UiItem({
			selector: '#generalStatusBox'
		});

		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
		});

		this.form.addEventListener('click', (e) => {
			if (e.target.tagName !== 'INPUT') {
				return;
			}
			if (this.submitBtn.is('disabled')) {
				this.submitBtn.enable();
			}
		});

		this.onSubmitting = this.onSubmitting.bind(this);
		this.submitBtn.onClick(this.onSubmitting);
	}

	onSubmitting () {
		const the = {
			formIsInvalid: false,
			userExistsAlready: false,
			userCheckFailed: false,
			formSubmissionFailed: false
		}
		const self = this;
		return Promise.resolve()
			.then(sanitiseUserInput)
			.then(ensureFormIsValid)
			.then(ensureEmailDoesNotExist)
			.then(submitForm)
			.catch(reportError);

		function sanitiseUserInput() {
			self.signupFormValidator.sanitiseForm();
		}

		function ensureFormIsValid() {
			const formIsValid = self.signupFormValidator.validateForm();
			if (!formIsValid) {
				the.formIsInvalid = true;
				return Promise.reject('invalid form');
			}
		}

		function ensureEmailDoesNotExist() {
			return self.signupFormValidator.checkIfEmailExists()
				.then(null, (error) => {
					if (error === 'emailExists') {
						the.userExistsAlready = true;
						return Promise.reject();
					}
					if (error === 'userCheckFailed') {
						the.userCheckFailed = true;
						return Promise.reject();
					}
				});
		}	

		function submitForm() {
			self.submitBtn.disable();
			self.submitBtn.setLabelTo('submitting');
			return submitUserData(self.url, self.form)
				.then((response) => {
					if (response.submitSucceeds) {
						console.log('success');
						window.localStorage.setItem('userId', response.userId);
// `username` defined in global by external code.
// See https://github.com/FTChinese/webapp/blob/master/app/scripts/main.js				
						username = docCookie.getItem('USER_NAME');
// hide signup form. show profile form						
						self.formUi.removeFromDisplay();
						self.nextForm.display();
// change text on button						
						self.submitBtn.setLabelTo('submitted');
// update cookie						
						checkLogin();
					}
				}, (error) => {
					the.formSubmissionFailed = true;
					return Promise.reject(error);
				});
		}

		function reportError (error) {
			if (the.formIsInvalid) {
				
			} else if (the.userExistsAlready) {
				self.submitBtn.setLabelTo('emailExists');
			}else if (the.userCheckFailed) {
				self.showGeneralErrorMessage();
			} else if (the.formSubmissionFailed) {
				self.showGeneralErrorMessage();
			}			
		}						
	}

	showGeneralErrorMessage () {
		this.generalStatusBox.displayError(SYSTEM_DOWN);
	}

	hideAllStatusMessage() {
		this.generalStatusBox.removeFromDisplay();
	}

	static init () {
		new SignupForm('#signupForm');
	}
}

export default SignupForm;
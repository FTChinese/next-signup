import view from './signup-form-view.js';
import {checkIfEmailExists, submitUserData} from './user-api.js';

function onSubmittingSignup () {
	const the = {
		formIsInvalid: false,
		userExistsAlready: false,
		userCheckFailed: false,
		formSubmissionFailed: false
	}
	view.hideAllStatusMessage();
	return Promise.resolve()
		.then(sanitiseUserInput)
		.then(ensureFormIsValid)
		.then(ensureEmailDoesNotExist)
		.then(submitForm)
		.catch(reportError);

	function sanitiseUserInput () {
		view.signUpFormValidator.sanitiseForm();
	}

	function ensureFormIsValid() {
		const formIsValid = view.signUpFormValidator.validateForm({
			silently: true
		});
		if (!formIsValid) {
			the.formIsInvalid = true;
			return Promise.reject();
		}
	}

	function ensureEmailDoesNotExist () {
		return checkIfEmailExists(view.email.input)
			.then(result => {
				if (result === 'yes') {
					the.userExistsAlready = true;
					return Promise.reject()
				}
			})
			.catch(error => {
				the.userCheckFailed = true;
				return Promise.reject(error);
			});
	}

	function submitForm() {
		return submitUserData(view.form.element)
			.then((response) => {
				if (response.submitSucceeds) {
					view.form.removeFromDisplay();
					view.profileForm.display();
				}
			})
			.catch(error => {
				the.formSubmissionFailed = true;
				return Promise.reject(error);
			});
	}

	function showAllValidationErrors () {
		view.signUpFormValidator.validateForm();
	}

	function reportError (error) {
		if (the.formIsInvalid) {
			showAllValidationErrors()
		} else if (the.userExistsAlready) {
			view.signUpFormValidator.flagFieldAsInvalidByFieldName('email');
			view.emailExistsStatusBox.display();
		}else if (the.userCheckFailed) {
			console.log('user check failed.');
			view.showGeneralErrorMessage();
		} else if (the.formSubmissionFailed) {
			console.log('submit failed');
			view.showGeneralErrorMessage();
		}
		// return Promise.reject(error);
	} 
}

export default onSubmittingSignup;
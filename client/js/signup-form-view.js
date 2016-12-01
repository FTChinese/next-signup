import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';

const SYSTEM_DOWN = '很抱歉，服务器遇到一些技术问题，请稍后再试';

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

		this.generalStatusBox = new UiItem({
			selector: '#generalStatusBox'
		});
	}

	onEnteringAnEmail (callback) {
		this.email.onValueChanged((target) => {
			callback(target);
		});
	}

	onClickingSubmitBtn(callback) {
		this.submitBtn.onClick((e) => {
			callback(e.target);
		});
	}

	onSubmitting() {
		this.form.onSubmit();
	}

	showGeneralErrorMessage () {
		this.generalStatusBox.displayError(SYSTEM_DOWN);
	}

	hideAllStatusMessage() {
		this.generalStatusBox.removeFromDisplay();
	}
}

export default new SignupFormView();
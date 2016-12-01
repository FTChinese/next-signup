import UiItem from './ui-item.js';
import FormValidator from './form-validator.js';
import view from './signup-form-view.js';

import onEnteringAnEmail from './on-entering-an-email.js';
import onSubmittingSignup from './on-submitting-signup.js';

class SignupForm {

	static init () {
		view.onEnteringAnEmail((target) => {
			onEnteringAnEmail();
		});

		view.onClickingSubmitBtn((target) => {
			onSubmittingSignup();
		})

		view.onSubmitting();
	}
}

export default SignupForm;
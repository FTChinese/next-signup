import view from './signup-form-view.js';
import { checkIfEmailExists } from './user-api.js';

function onEnteringAnEmail () {
	view.emailExistsStatusBox.removeFromDisplay();

	return Promise.resolve()
		.then(() => {
			if (emailIsValid()) {

				return checkIfEmailExists(view.email.input);
			}
		})
		.catch(error => {
			return false;
		})
		.then((result) => {
			if(result.emailExists) {
				view.emailExistsStatusBox.display();
			}
		})
		.catch(error => {

		});

	function emailIsValid() {
		return view.signUpFormValidator.validate(view.email.input);
	}
}

export default onEnteringAnEmail;
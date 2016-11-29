// import serialize from './serialize.js';
import {submitForm} from './helper.js';

class ProfileForm {
	static init () {
		const form = document.getElementById('profileForm');

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitForm(form)
				.then(() => {
					document.getElementById('formEnd').classList.remove('su-form--not-displayed')
				})
				.catch(error => {
					return Promise.reject(error);
				});
		});			
	}
}

export default ProfileForm;
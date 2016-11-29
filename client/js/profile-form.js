// import serialize from './serialize.js';
import {submitForm} from './helper.js';

class ProfileForm {
	static init () {
		const form = document.getElementById('profileForm');
		const msgEl = form.querySelector('.o-forms-message');

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
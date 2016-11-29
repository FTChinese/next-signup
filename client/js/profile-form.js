import serialize from './serialize.js';
import {postData} from './helper.js';

class ProfileForm {
	static init () {
		const profileForm = document.getElementById('profileForm');

		profileForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const formData = serialize(profileForm, {
				hash: true,
				empty: true
			});
			const url = profileForm.action;
			formData.id = profileForm.id;
			formData.CAPTCHA = window.CAPTCHA;
			
			console.log(formData)
			postData(url, formData)
				.then(response => {
					if (response.submitFailed) {
						document.getElementById('generalStatusBox').classList.add('error');
						return Promise.reject()
					} else {

					}
				})
				.catch(error => {
					return Promise.reject(error);
				});
		});			
	}
}

export default ProfileForm;
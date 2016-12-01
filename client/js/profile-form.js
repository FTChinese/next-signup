import UiItem from './ui-item.js';
import {submitUserData} from './user-api.js';

class ProfileForm {
	constructor(selector) {
		this.form = new UiItem({
			selector: '#profileForm'
		});
		this.successBox = new UiItem({
			selector: '#savedProfile'
		});
		this.btn = new UiItem({
			selector: '#profileSubmitBtn'
		});
// enable submit button if clicked on input element
		this.form.onClick((e) => {
			if (e.target.tagName !== 'INPUT') {
				return;
			}
			if (this.btn.is('disabled')) {
				this.successBox.removeFromDisplay();
				this.btn.enable();
			}
		});

		this.form.onSubmit((target) => {
			submitUserData(target)
				.then((response) => {
					if (response.submitSucceeds) {
						this.successBox.display();
						this.btn.disable();
					} else {
						this.form.element.querySelector('.o-forms-message').classList.add('error');
						return Promise.reject('Submit Failed');
					}					
				})
				.catch(error => {
					if (error) {console.log(error);}
				});
		});
	}
	static init () {
		new ProfileForm();		
	}
}

export default ProfileForm;
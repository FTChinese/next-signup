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
		this.generalStatusBox = new UiItem({
			selector: '#generalStatusBox'
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

		this.btn.onClick((e) => {
			this.removeError();
			submitUserData(this.form.element)
				.then((response) => {
					if (response.submitSucceeds) {
						this.successBox.display();
						this.btn.disable();
					} else {
						return Promise.reject('Submit Failed');
					}					
				})
				.catch(error => {
					if (error) {
						this.showError()
						console.log(error);
					}
				});			
		});

		this.form.onSubmit();
	}

	showError() {
		this.form.element.querySelector('.o-forms-message').classList.add('error');
	}

	removeError() {
		this.form.element.querySelector('.o-forms-message').classList.remove('error');
	}

	static init () {
		new ProfileForm();		
	}
}

export default ProfileForm;
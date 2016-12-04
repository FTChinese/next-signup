import UiItem from './ui-item.js';
import {submitUserData} from './user-api.js';

const SYSTEM_DOWN = '很抱歉，服务器遇到一些技术问题，请稍后再试';

class ProfileForm {
	constructor(selector) {
		this.form = (selector instanceof HTMLElement) ? selector : document.querySelector(selector);

		this.url = this.form.action;

		this.btn = new UiItem({
			selector: '#profileSubmitBtn'
		});
		this.generalStatusBox = new UiItem({
			selector: '#generalStatusBox'
		});
// enable submit button if clicked on input element
		this.form.addEventListener('click', (e) => {
			if (e.target.tagName !== 'INPUT') {
				return;
			}
			if (this.btn.is('disabled')) {
				this.btn.enable();
			}
		});

		this.btn.onClick((e) => {
			// this.removeError();
			this.btn.setLabelTo('saving');
			submitUserData(this.url, this.form)
				.then((response) => {
					if (response.submitSucceeds) {
						this.btn.setLabelTo('saved');
						this.btn.disable();
					} else {
						return Promise.reject('Submit Failed');
					}					
				})
				.then(null, (error) => {

				});			
		});
		
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
		});
	}

	showGeneralErrorMessage () {
		this.generalStatusBox.displayError(SYSTEM_DOWN);
	}

	hideAllStatusMessage() {
		this.generalStatusBox.removeFromDisplay();
	}

	static init () {
		new ProfileForm('#profileForm');		
	}
}

export default ProfileForm;
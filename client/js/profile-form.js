import UiItem from './ui-item.js';
import {submitForm} from './helper.js';

class ProfileForm {
	constructor(selector) {
		this.form = document.getElementById('profileForm');
		console.log(this.form);
		this.successBox = new UiItem({
			selector: '#formEnd'
		});
		this.btn = new UiItem({
			selector: '#profileSubmitBtn'
		});
// enable submit button if clicked on input element
		this.form.addEventListener('click', (e) => {
			if (e.target.tagName !== 'INPUT') {
				return;
			}
			if (this.btn.isDisabled) {
				this.successBox.removeFromDisplay();
				this.btn.enable();
			}
		});

		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitForm(this.form)
				.catch(error => {
					if (error) {console.log(error);}
				})
				.then(() => {
					this.successBox.display();
					// disable submit button after succeed.
					this.btn.disable();
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
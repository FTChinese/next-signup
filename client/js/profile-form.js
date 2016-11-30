import UiItem from './ui-item.js';
import {submitForm} from './helper.js';

class ProfileForm {
	constructor(selector) {
		this.form = document.getElementById('profileForm');
		console.log(this.form);
		this.successBox = new UiItem({
			selector: '#formEnd'
		});
		
		this.form.addEventListener('submit', (e) => {
			e.preventDefault();
			submitForm(this.form)
				.catch(error => {
					if (error) {console.log(error);}
				})
				.then(() => {
					this.successBox.display();
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
import InputValidator from './input-validator.js';

class FormValidator {
	constructor(formEl) {

		this.form = (formEl instanceof HTMLElement)
			? formEl : document.querySelector(formEl);

		const selectors = this.form.querySelectorAll('.su-field');

		this.fields = [];
		for (let i = 0; i < selectors.length; i++) {
			const inst = new InputValidator({
				selector: selectors[i]
			});
			if (inst.remoteUrl) {
				this.email = inst;
			}
			inst.enableValidate();
			this.fields.push(inst);
		}
	}

	sanitiseForm() {
		for (let i = 0; i < this.fields.length; i++) {
			this.fields[i].sanitise()
		}
	}

	validateForm(options={silent: false}) {
		let isValid = true;
		for (let i = 0; i < this.fields.length; i++) {
			const inputIsValid = this.fields[i].validate();
			if (!inputIsValid) {
				isValid = false;
			}
		}
		return isValid;
	}

	checkIfEmailExists() {
		return this.email.remoteValidate();
	}

	static init() {
		new FormValidator('.su-form');
	}
}

export default FormValidator;
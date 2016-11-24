// import ajax from 'ajax';
import ErrorMessage from './error-message.js';
// import validators from './validator.js';
import Baseform from './base-form.js';

class Validate extends Baseform {
	constructor(rootEl) {
		super(rootEl);

		this.inputEl = this.rootEl.querySelector('.o-forms__text');
		this.name = this.inputEl.name;
		this.patterns = this.inputEl.getAttribute('pattern').split(',').map((p) => p.trim());
		this.unique = this.inputEl.getAttribute('data-checkurl');

		this.error = new ErrorMessage(this.rootEl);

		this.labelText = this.rootEl.querySelector('.o-forms__label').textContent;
		this.infoText = this.rootEl.querySelector('.o-forms__additional-info').textContent;
		this.type = this.inputEl.getAttribute('type');

		
		this.inputEl.addEventListener('focus', this.handleFocus);
		this.inputEl.addEventListener('blur', this.validate);
	}
}

export default Validate;
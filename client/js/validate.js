// import ajax from 'ajax';
import ErrorMessage from './error-message.js';
// import validators from './validator.js';
import Baseform from './base-form.js';

class Validate extends Baseform {
	constructor(rootEl) {
		super(rootEl);

		this.inputEl = this.rootEl.querySelector('.o-forms__text');
		this.name = this.inputEl.name;
		this.pattern = this.inputEl.getAttribute('pattern').trim();
		this.checkurl = this.inputEl.getAttribute('data-checkurl');
		this.required = this.inputEl.hasAttribute('required');

		this.error = new ErrorMessage(this.rootEl);

// data to be used by Chatbox.
		this.labelText = this.rootEl.querySelector('.o-forms__label').textContent;
		this.infoText = this.rootEl.querySelector('.o-forms__additional-info').textContent;
		this.type = this.inputEl.getAttribute('type');
		
		this.inputEl.addEventListener('focus', this.handleFocus);
		this.inputEl.addEventListener('blur', this.validate);
	}

	static init(el) {
		const instances = [];

		if (!el) {
			el = document.body;
		} else if (!(el instanceof HTMLELement)) {
			el = document.querySelector(el);
		}
		const instanceEls = el.querySelectorAll('[data-o-component="o-validate"]');

		for (let i = 0; i < instanceEls.length; i++) {
			instances.push(new Validate(instanceEls[i]));
		}
		return instances;
	}
}

export default Validate;
import ajax from 'ajax';
import ErrorMessage from './error-message.js';
import validators from './validator.js';

class Baseform {
	constructor(rootEl) {
		if (!rootEl) {
			return new Error('No rootEl!');
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		this.rootEl = rootEl;

// Should not implemented in base class		
		this.inputEl = null;

		this.name = null;
		this.patterns = null;
		this.unique = null;

		this.error = null;
/**/
		this.handleFocus = this.handleFocus.bind(this);
		this.validate = this.validate.bind(this);
		
		// this.inputEl.addEventListener('focus', this.handleFocus);
		// this.inputEl.addEventListener('blur', this.validate);
	}

	handleFocus(e) {
/* e.target.checked for checkbox and radio.
 * It always returns false to other types.
 * `checked` refer to the status before before changed.
*/	
		if (e.target.checked) {
			this.error.setErrorText();
			this.error.show();
			this.setInvalid();
		} else {
			this.error.clear();
			this.inputEl.removeAttribute('aria-invalid');
		}
	}

	validate(e) {
		const valid = this.checkPattern();
		if (!valid) {
			this.stop();
			return;
		}

		if (!this.unique) {
			this.advance();
			return;
		}

		const data = {};
		data[this.name] = this.inputEl.value;
		this.checkUnique(data);
	}

	checkUnique(data) {
		ajax()
			.post(this.unique, data)
			.then((response) => {
				if (response.available) {
					this.advance();
				} else {
					this.error.setErrorText();
					this.stop();
				}
			});
	}

	checkPattern() {

		const inputValue = this.inputEl.value;
		var validity;
		for (let i = 0; i < this.patterns.length; i++) {
			const pattern = this.patterns[i];
			validity = validators[pattern](inputValue);

			if (!validity) {
				this.error.setErrorText(pattern);
				break;
			}
		}
		return validity;
	}

	advance() {
		this.setValid();
		this.error.clear();
	}

	stop() {
		this.setInvalid();
		this.error.show();
	}

	setInvalid() {
		this.inputEl.setAttribute('aria-invalid', 'true');
	}

	setValid() {
		this.inputEl.setAttribute('aria-invalid', 'false');
	}	
}

export default Baseform;
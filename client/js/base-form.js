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
		this.pattern = null;
		this.checkurl = null;
		this.required = null;

		this.error = null;
/**/
		this.handleFocus = this.handleFocus.bind(this);
		this.validate = this.validate.bind(this);
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
		if (this.required) {
			if (!this.checkRequired()) {
				this.stop();
				return;
			}
		}
// If input value failed regex test, then stop and return.	
		if (!this.checkPattern()) {
			this.stop();
			return;
		}
// If this.checkurl does not exist, it means this input does not need remote validation.
		if (!this.checkurl) {
			this.advance();
			return;
		}
// If input value passed regex test, and it has a remote url, then collect the input value and  request to server for check.
		const data = {};
		data[this.name] = this.inputEl.value;
		this.checkUnique(data);
	}

	checkUnique(data) {
		ajax()
			.post(this.checkurl, data)
			.then((response) => {
				if (response.available) {
// If server responsed with ok, then advance to next step					
					this.advance();
				} else {
					this.error.setErrorText();
					this.stop();
				}
			});
	}

	checkPattern() {
		const validity = validators[this.pattern](this.inputEl.value, this.inputEl);
		if (!validity) {
			this.error.setErrorText(this.pattern);
		}

		return validity;
	}

	checkRequired() {
		const validity = validators.required(this.inputEl.value);
		if (!validity) {
			this.error.setErrorText('required');
		}
		return validity;
	}

	advance() {
// Record data when everythin is valid and could proceed to the next step.	
		console.log('Advance to next step. Recording data. Set valid status. Clear error msg.');
		localStorage.setItem(this.name, this.inputEl.value);
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
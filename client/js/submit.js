import ajax from 'ajax';
import serialize from './serialize.js';
/*
 * @param {HTMLFormElement} formEl
 * @param {Object} config
 * @param {Array} config.required - HTMLElement
 * @param {Function} config.callback
 */
class Submit {
	constructor(formEl, config) {
		if (!formEl) {
			return new Error('No formEl!');
		} else if (!(formEl instanceof HTMLElement)) {
			formEl = document.querySelector(formEl);
		}
		this.formEl = formEl;
		this.formErrorEl = this.formEl.querySelector('o-forms__message');
		this.action = this.formEl.action;

		if (config) {
			this.required = config.required || [];
		}

		if (config && config.callback) {
			this.callback = config.callback;
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.formEl.addEventListener('submit', this.handleSubmit);
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.checkValidity()) {
			const formData = serialize(e.currentTarget, {
				hash: true,
				empty: true
			});	
			formData.id = this.formEl.id;

			ajax()
				.post(this.action, formData)
				.then((response) => {
					console.log(response);
		// if response succeed, then hide the form.
					if (response.status === 'ok') {
						this.callback && this.callback(this.formEl);
					} else {
						this.formErrorEl.classList.add('o-forms__message--error');
					}
				});					
		} else {
			console.log('Failed validation.');
		}
	
	}

	checkValidity() {
		if (this.required) {
			return this.required.every((el) => {
				return el.inputEl.getAttribute('aria-invalid') === 'false';
			});
		}
		return true;
	}
}

export default Submit;
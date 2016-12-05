import setDefault from './set-default.js';
import validators from './validator.js';
import UiItem from './ui-item.js';

class InputValidator {
	constructor(settings={}) {
		setDefault(settings).to({
			selector: '',
			fieldClass: 'su-field',
			inputClass: 'su-field__input',
			validClass: 'su-field--valid',
			invalidClass: 'su-field--error',
			statusBox: '#emailExistsStatusBox'
		});

		let field = getFieldElement();

		this.settings = settings;
		this.field = field;
		this.validators = getValidators();
		console.log(this.validators);
		this.input = this.field.querySelector(`.${settings.inputClass}`);
		this.remoteUrl = this.field.getAttribute('data-remote-validate');
		if (this.remoteUrl) {
			this.emailExistsStatusBox = new UiItem({
				selector: this.settings.statusBox
			});			
		}

		function getFieldElement () {
			if (settings.selector instanceof HTMLElement) {
				return settings.selector
			}
			return settings.selector.length
					? document.querySelector(settings.selector)
					: document.querySelector(`.${settings.fieldClass}`);
		}

		function getValidators () {
			return field.hasAttribute('data-validate')
				? field.getAttribute('data-validate')
					.split(',').map((name) => {
						return validators[name];
					})
				: null
		}
	}

	enableValidate() {
		this.input.addEventListener('blur', (event) => {
			this.sanitise();
			this.validate();
		});
// remove error message on focus.
		this.input.addEventListener('focus', (event) => {
			this.removeFlag();
			// this.hideAllStatusMessage();
		});

		if (!this.remoteUrl) {
			return;
		}

		this.input.addEventListener('change', (event) => {
			if (this.validate({silent: true})) {
				this.remoteValidate()
					.catch(error => {
						console.log(error);
					});
			}
		});			
	}

	remoteValidate () {
		this.field.classList.add('remote-validating');
		this.emailExistsStatusBox.hide();
		return fetch(`${this.remoteUrl}?e=${this.input.value}`, {
			method: 'GET'
		})
		.then((response) => {
			return response.text();
		}, (error) => {
			return Promise.reject('userCheckFailed');
		})
		.then((result) => {
			this.field.classList.remove('remote-validating');
			if (result === 'yes') {
				this.emailExistsStatusBox.show();
				return Promise.reject('emailExists');
			}
		}, (error) => {
			return Promise.reject(error);
		});
	}

	sanitise () {
		switch (this.input.type) {
			case 'text':
			case 'email':
			case 'search':
			case 'url':
				this.input.value = this.input.value.replace(/\s/g, '');
				break;
		}
	}

	validate (options={silent: false}) {
		let isValid = true;
		const inputValue = this.input.value.trim();
		if (!this.validators) {
			return isValid;
		}
		for (let i = 0, j = this.validators.length; i < j; i++) {
			if (!this.validators[i](inputValue, this.input)) {
				isValid = false;
				break;
			}
		}

		if (!options.silent) {
			isValid ? this.flagAsValid() : this.flagAsInvalid();
		}
		return isValid;
	}

	flagAsInvalid() {
		this.field.classList.add(this.settings.invalidClass);
		this.field.classList.remove(this.settings.validClass);

		if (this.emailExistsStatusBox) {
			this.emailExistsStatusBox.hide();
		}
	}

	flagAsValid() {
		this.field.classList.add(this.settings.validClass);
		this.field.classList.remove(this.settings.invalidClass);
	}

	removeFlag() {
		this.field.classList.remove(this.settings.validClass);
		this.field.classList.remove(this.settings.invalidClass);
	}

	static init (el, settings = {}) {
		const instances = [];
		if (!el) {
			el = document.body
		} else if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}

		const fieldEls = el.querySelectorAll('.su-field');
		for (let i = 0; i < fieldEls.length; i++) {
			const inst = new InputValidator({
				selector: fieldEls[i]
			});
			inst.enableValidate();
			instances.push(inst)
		}
		return instances;
	}
}

export default InputValidator;
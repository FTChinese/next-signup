import setDefault from './set-default.js';

class ShowPassword {
	constructor (wrapperEl, settings = {}) {
		setDefault(settings).to({
			inputClass	: 'su-field__input',
			checkboxClass		: 'show-password__checkbox'
		});
		
		this.wrapper = wrapperEl;
		if (!(this.wrapper instanceof HTMLElement)) {
			this.wrapper = document.querySelector(this.wrapper);
		}

		this.input = this.wrapper.querySelector(`.${settings.inputClass}`);
		this.checkbox = this.wrapper.querySelector(`.${settings.checkboxClass}`);

		this.checkbox.addEventListener('change', () => {
			this.checkboxIsChecked() ? this.setInputTypeToText() : this.setInputTypeToPassword();
// hide error when show password
			const event = new Event('focus');
			this.input.dispatchEvent(event);
		});
	}

	checkboxIsChecked () {
		return this.checkbox.checked;
	}

	setInputTypeToText() {
		this.input.type = 'text';
	}

	setInputTypeToPassword() {
		this.input.type = 'password';
	}

	static init () {
		const instances = [];
		const wrapperEls = document.querySelectorAll('.show-password');
		for (let i = 0; i < wrapperEls.length; i++) {
			instances.push(new ShowPassword(wrapperEls[i]));
		}

		return instances;
	}
}

export default ShowPassword;
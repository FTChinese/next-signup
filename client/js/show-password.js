import setDefault from './set-default.js';

class ShowPassword {
	constructor (wrapperEl, settings = {}) {
		setDefault(settings).to({
			controlClass		: 'js-show-password',
			passwordInputClass	: 'js-show-password__password-input',
			checkboxClass		: 'js-show-password__checkbox'
		});
		
		this.wrapper = wrapperEl;
		if (!(this.wrapper instanceof HTMLElement)) {
			this.wrapper = document.querySelector(this.wrapper);
		}

		this.input = this.wrapper.querySelector(`.${settings.passwordInputClass}`);
		this.checkbox = this.wrapper.querySelector(`.${settings.checkboxClass}`);
		this.checkbox.addEventListener('change', () => {
			this.checkboxIsChecked() ? this.setInputTypeToText() : this.setInputTypeToPassword();
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

	static init (settings = {}) {
		setDefault(settings).to({
			controlClass		: 'js-show-password',
				passwordInputClass	: 'js-show-password__password-input',
				checkboxClass		: 'js-show-password__checkbox'
		});

		const instances = [];
		const wrapperEls = document.querySelectorAll(`.${settings.controlClass}`);
		for (let i = 0; i < wrapperEls.length; i++) {
			instances.push(new ShowPassword(wrapperEls[i], settings));
		}

		return instances;
	}
}

export default ShowPassword;
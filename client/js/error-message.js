import {errorText} from './helper.js';
class ErrorMessage {
	constructor(rootEl, config) {
		this.rootEl = rootEl;
		config = config || {};
		this.errorEl = config.errorEl || '.o-forms__errortext';
		this._errorClass = config.errorClass || 'o-forms--error';

		if (!(this.errorEl instanceof HTMLElement)) {
			this.errorEl = this.rootEl.querySelector(this.errorEl);
		}
		
		this._defaultMsg = this.errorEl.innerHTML;
		this.errorEl.textContent = '';
	}

	setErrorText(type) {
		if (type) {
			this._errorText = errorText[type];
		} else {
			this._errorText = this._defaultMsg;
		}
		
	}

	show() {
		this.errorEl.innerHTML = this._errorText;
		this.rootEl.classList.add(this._errorClass);
	}

	clear() {
		this.rootEl.classList.remove(this._errorClass);
	}
}
export default ErrorMessage;
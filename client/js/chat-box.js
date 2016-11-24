import ajax from 'ajax';
import ErrorMessage from './error-message.js';
import Baseform from './base-form.js';
/*
config.forms = 
[
 		labelText: form.labelEl.textContent,
 		infoText: form.infoEl.textContent,
 		rootEl: form.rootEl,
 		inputEl: form.inputEl,
 		name: form.id,
 		type: form.type,
 		checkUnique: form.checkAvail
]
 * @param {Array} - result of `Signup.init()`
*/

class ChatBox extends Baseform {
	constructor(rootEl, config) {
		super(rootEl);

		this.formEl = config.form;
	
		if (!this.formEl) {
			return new Error('Provide form element');
		} else if (!(this.formEl instanceof HTMLElement)) {
			this.formEl = document.querySelector(this.formEl);
		}

		this.inputEl = this.rootEl.querySelector('.o-forms__text');

		this.labelEl = this.rootEl.querySelector('.o-forms__label');
		this.infoEl = this.rootEl.querySelector('.o-forms__additional-info');

		this.buttonEl = this.rootEl.querySelector('.o-forms__button')

		this.error = new ErrorMessage(this.rootEl);

		this.progress = 0;
		this.steps = config.source;
		this.currentStep = this.steps[this.progress];

		this.changeText();


		this.inputEl.addEventListener('focus', this.handleFocus);
		this.buttonEl.addEventListener('click', this.validate);
		
		this.formEl.setAttribute('data-n-chatbox--js', 'true');
		this.rootEl.setAttribute('data-n-chatbox--js', 'true');
	}

	advance() {
		super.advance()
		this.currentStep.rootEl.classList.add('o-forms--active');
		this.currentStep.inputEl.value = this.inputEl.value;
		this.currentStep.advance();
		// this.currentStep.setInvalid('false');

		this.inputEl.value = '';		
// Increment `progress` before comparison.
		if (++this.progress < this.steps.length) {
			console.log('advance to: ', this.progress);
			this.currentStep = this.steps[this.progress];
			this.changeText();
		} else {
			this.destroy();
			this.formEl.removeAttribute('data-n-chatbox--js');
		}
	}

	changeText() {
		this.labelEl.textContent = this.currentStep.labelText;
		this.infoEl.textContent = this.currentStep.infoText;
		this.inputEl.type = this.currentStep.type;
		this.patterns = this.currentStep.patterns;
		this.error._defaultMsg = this.currentStep.error._defaultMsg;
		this.unique = this.currentStep.unique;
		this.name = this.currentStep.name;
	}

	destroy() {
		this.rootEl.parentNode.removeChild(this.rootEl);
	}
}

export default ChatBox;
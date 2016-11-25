import ajax from 'ajax';
import ErrorMessage from './error-message.js';
import Baseform from './base-form.js';
/*
Instance of Validate.
config.source = 
[
	{
 		labelText: form.labelEl.textContent,
 		infoText: form.infoEl.textContent,
 		rootEl: form.rootEl,
 		inputEl: form.inputEl,
 		name: form.name,
 		type: form.type,
 		checkurl: form.checkurl	
	}
]
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
// Proceed to here after regex test and remote validation
		this.currentStep.rootEl.classList.add('o-forms--active');
		this.currentStep.inputEl.value = this.inputEl.value;
// Trigger currentStep's advance.		
		this.currentStep.advance();
// Clear Chatbox's input
		this.inputEl.value = '';		
// Increment `progress` before comparison.
		if (++this.progress < this.steps.length) {
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
		clearAttributes(this.inputEl);
		copyAttributes(this.currentStep.inputEl, this.inputEl);

		this.error._defaultMsg = this.currentStep.error._defaultMsg;
		this.pattern = this.currentStep.pattern;
		this.checkurl = this.currentStep.checkurl;
		this.name = this.currentStep.name;
		this.required = this.currentStep.required;
		console.log(this);
	}

	destroy() {
		this.rootEl.parentNode.removeChild(this.rootEl);
	}
}

function copyAttributes(source, target) {
	var attrs = source.attributes;
	for (let i = attrs.length - 1; i >= 0; i--) {
		const attr = attrs[i];
		switch (attr.name) {
			case 'id':
			case 'class':
			case 'name':
// ftc-toggle adds `aria-hidden`, ignore it.
			case 'aria-hidden':
				break;

			default:
				target.setAttribute(attr.name, attr.value);
		}
	}
}

function clearAttributes(el) {
	var attrs = el.attributes;
	for (let i = attrs.length - 1; i >= 0; i--) {
		const attr = attrs[i];
		switch (attr.name) {
			case 'id':
			case 'class':
			case 'name':
				break;

			default:
				el.removeAttribute(attr.name);
		}
	}	
}
export default ChatBox;
import ajax from 'ajax';
import validators from './validator.js';
import getUnityComponents from './collect-components.js';
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

class UnityInput {
	constructor(rootEl, config) {
		if (!rootEl) {
			return new Error('No rootEl!');
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		this.rootEl = rootEl;

		this.formEl = config.form;
	
		if (!this.formEl) {
			return new Error('Provide form element');
		} else if (!(this.formEl instanceof HTMLElement)) {
			this.formEl = document.querySelector(this.formEl);
		}

		this.inputEl = this.rootEl.querySelector('.su-field__input');

		this.labelEl = this.rootEl.querySelector('.su-field__label');
		this.errorEl = this.rootEl.querySelector('.su-field__error');
		this.buttonEl = this.rootEl.querySelector('.su-btn');
		this.instructionEl = this.rootEl.querySelector('.su-field__instructions');

		this.progress =  0;

		this.steps = getUnityComponents(['emailField', 'passwordField']);
		console.log(this.steps);

		this.currentStep = this.steps[this.progress];

		this.changeText();

		this.validate = this.validate.bind(this);
		this.buttonEl.addEventListener('click', this.validate);
		
		this.formEl.setAttribute('data-unity-input--js', 'true');
		this.rootEl.setAttribute('data-unity-input--js', 'true');
	}

	validate(e) {	
		if (!this.checkPattern()) {
			console.log('invalid pattern');
			this.setErrorMsg();
			this.flagAsInvalid();

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
				console.log(response);
				if (response.emailExists) {
// If server responsed with ok, then advance to next step			
					this.flagAsInvalid();
					this.setErrorMsg('邮箱已经注册');
					console.log('email taken');
				} else {
					this.advance();
				}
			});
	}

	checkPattern() {
		let isValid = false;
		const self = this;
		validateInput();
		// isValid ? this.flagAsValid() : this.flagAsInvalid;

		function validateInput() {
			isValid = true;
			for (let i = 0; i < self.patterns.length; i++) {
				const pattern = self.patterns[i];
				if (!validators[pattern](self.inputEl.value)) {
					isValid = false;
					console.log(isValid, ' for ', pattern);
					break;
				}
			}			
		}
		return isValid;
	}

	advance() {
// Proceed to here after regex test and remote validation
		this.flagAsValid();
		this.currentStep.rootEl.classList.add('o-forms--active');
		this.currentStep.inputEl.value = this.inputEl.value;		

// Clear Chatbox's input
		this.inputEl.value = '';
		this.inputEl.click();
		console.log('trigger click');
		this.inputEl.focus();
		console.log('trigger focus');
// Increment `progress` before comparison.
		if (++this.progress < this.steps.length) {
			this.currentStep = this.steps[this.progress];
			this.changeText();
		} else {
			this.destroy();
			this.formEl.removeAttribute('data-unity-input--js');
		}
	}

	changeText() {
		this.labelEl.textContent = this.currentStep.labelText;
		this.errorEl.textContent = this.currentStep.errorText;
		this.instructionEl.textContent = this.currentStep.instructionText;

		clearAttributes(this.inputEl);
		copyAttributes(this.currentStep.inputEl, this.inputEl);

		this.patterns = this.currentStep.patterns;
		this.checkurl = this.currentStep.checkurl;
		this.name = this.currentStep.name;
		console.log(this.patterns);
	}

	flagAsInvalid () {
		console.log('flag as invalid');
		this.rootEl.classList.add('o-forms--error');
		this.rootEl.classList.remove('o-forms--valid');
	}

	flagAsValid () {
		this.rootEl.classList.add('o-forms--valid');
		this.rootEl.classList.remove('o-forms--error');
	}

	setErrorMsg(msg) {
		if (!msg) {
			this.errorEl.textContent = this.currentStep.errorText;
			console.log(this.errorEl.textContent);
		} else {
			this.errorEl.textContent = msg;
		}
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
export default UnityInput;
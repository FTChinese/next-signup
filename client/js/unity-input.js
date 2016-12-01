import validators from './validator.js';
import getUnityComponents from './collect-components.js';

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

		this.handleClick = this.handleClick.bind(this);
		this.buttonEl.addEventListener('click', this.handleClick);
		
		this.formEl.setAttribute('data-unity-input--js', 'true');
		this.rootEl.setAttribute('data-unity-input--js', 'true');
	}

	handleClick() {	
		if (!this.validate()) {
			console.log('invalid pattern');

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
		this.onEnteringEmail(data);
	}

	onEnteringEmail(data) {
		return	fetch(this.checkurl, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.catch(error => {
			return false;
		})
		.then((response) => {
			console.log('Getting response from server');
			return response.json();
		})
		.then((json) => {
			if (json.emailExists) {
				const emailExistsStatusBox = document.getElementById('emailExistsStatusBox');

				this.flagAsInvalid(emailExistsStatusBox.innerHTML);
				console.log('email taken');
			} else {
				this.advance();
			}
		})
		.catch(error => {
			console.log(error);
			return false;
		});
	}

	validate() {
		let isValid = false;
		const self = this;
		validateInput();

		isValid ? this.flagAsValid() : this.flagAsInvalid();

		return isValid;

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
		
	}

	advance() {
// Proceed to here after regex test and remote validation
		this.flagAsValid();
		this.currentStep.rootEl.classList.add('o-forms--active');
		this.currentStep.inputEl.value = this.inputEl.value;		

// Clear Chatbox's input
		this.inputEl.value = '';
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

	flagAsInvalid (msg) {
		console.log('flag as invalid');
		this.rootEl.classList.add('o-forms--error');
		this.rootEl.classList.remove('o-forms--valid');
		
		if (!msg) {
			this.errorEl.innerHTML = this.currentStep.errorText;
			console.log(this.errorEl.textContent);
		} else {
			this.errorEl.innerHTML = msg;
		}

	}

	flagAsValid () {
		this.rootEl.classList.add('o-forms--valid');
		this.rootEl.classList.remove('o-forms--error');
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

function collectElements(rootEl) {
		if (!rootEl) {
			return new Error('No rootEl!');
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		let labelText = rootEl.querySelector('.su-field__label').textContent;
		let errorText = rootEl.querySelector('.su-field__error').textContent;
		let instructionText = rootEl.querySelector('.su-field__instructions').textContent;

		let inputEl = rootEl.querySelector('.su-field__input');
		let name = inputEl.name;
		let checkurl = inputEl.getAttribute('data-checkurl');

		let patterns = rootEl.getAttribute('data-validate').split(',');

		return {
			rootEl: rootEl,
			labelText: labelText,
			errorText: errorText,
			instructionText: instructionText,
			inputEl: inputEl,
			name: name,
			checkurl: checkurl,
			patterns: patterns
		};
}

function getUnityComponents (idArray) {
		return idArray.map((id) => {

			return collectElements(document.getElementById(id));
		});
}
export default UnityInput;
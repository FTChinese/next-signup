import setDefault from './set-default.js';
import validators from './validator.js';

class FormValidator {
	constructor(settings={}) {
		setDefault(settings).to({
			selector       : '',
			formClass      : 'js-validate-form',
			fieldClass     : 'js-field',
			fieldInputClass: 'js-field__input',
			validClass     : 'o-forms--valid',
			invalidClass   : 'o-forms--error'
		});

		this.form = getFormElement();
		this.settings = settings;

		function getFormElement () {
			return settings.selector.length
					? document.querySelector(settings.selector)
					: document.querySelector(`.${settings.formClass}`);
		}
	}

	validateWhenFocusLeavesInput() {
// A function within method changes `this` scope.		
		const self = this;
		
		uponLeavingInput((input) => {
			self.sanitise(input);
			self.validate(input);
		});

		function uponLeavingInput (routine) {
// This also works on `radio` and `checkbox`, resulting validation of multi times. Filter them out?			
			self.form.addEventListener('blur', (event) => {
				if (event.target.classList.contains(self.settings.fieldInputClass)) {
					routine(event.target);
				}
			}, true);

// Listen for change on checkbox and radio for immediate feedback
			self.form.addEventListener('change', (event) => {
// Ignore `input` with `js-field__input` class for `change` event.				
				if (!event.target.classList.contains(self.settings.fieldInputClass)) {
					return;
				}

				if (event.target.type === 'radio' || event.target.type == 'checkbox') {
					routine(event.target);
				}
			});			
		}
	}

	sanitise (input) {
		switch (input.type) {
			case 'text':
			case 'email':
			case 'search':
			case 'url':
// Forbid any whitespace
				let _val = input.value.replace(/\s/g, '');
				FormValidator.updateInput(input, _val);
				break;
		}
	}

	sanitiseForm() {
		const inputs = this.form.querySelectorAll(`.${this.settings.fieldInputClass}`);
		for (let i = 0; i < inputs.length; i++) {
			this.sanitise(inputs[i]);
		}
	}

	validate (input, options={silently: false}) {
		const field = this.fieldOf(input);
// Get the validators function into an array. Loop over it, if input value matches every validator, then valid.		
		const validators = FormValidator.getValidatorsFor(field);
		let isValid = false;
		const inputValue = input.value.replace(/\s/g, '');

		validateInput();

		if(!options.silently) {
			isValid ? this.flagAsValid(field) : this.flagAsInvalid(field);
		}

		return isValid;

		function validateInput () {
			isValid = true;
			if (!validators) {
				return isValid;
			}
			for (let i = 0; i < validators.length; i++) {
				if (!validators[i](inputValue, input, field)) {
					isValid = false;
					break;
				}	
			}
		}
	}

	validateForm ({silently=false, excluding=[]}={}) {
		const inputs = this.getAllInputsToBeValidated();
		let isValid = true;

		for (let i = 0; i < inputs.length; i++) {
			const inputName = inputs[i].name;

			if(excluding.indexOf(inputName) === -1) {
				const inputIsValid = this.validate(inputs[i], {silently});
				if(!inputIsValid) {
					isValid = false;
				}
			}
		}
		return isValid;
	}

	getAllInputsToBeValidated () {
		const inputs = this.form.querySelectorAll(`.${this.settings.fieldInputClass}`);
		const result = [];
		for (let i = 0; i < inputs.length; i++) {
			const field = this.fieldOf(inputs[i]);
			const display = field.currentStyle ? field.currentStyle.display : getComputedStyle(field, null).display;
			if(display !== 'none') {
				result.push(inputs[i]);
			}
		}
		return result;
	}

	fieldOf (element) {
		return element.closest(`.${this.settings.fieldClass}`);
	}

	flagAsInvalid (field) {
		field.classList.add(this.settings.invalidClass);
		field.classList.remove(this.settings.validClass);
	}

	flagFieldAsInvalidByFieldName (fieldName) {
		const input = document.querySelector(`[name="${fieldName}"]`);
		this.flagAsInvalid(this.fieldOf(input));
	}

	flagAsValid (field) {
		field.classList.add(this.settings.validClass);
		field.classList.remove(this.settings.invalidClass);
	}

	getFirstFieldFlaggedAsInvalid () {
		const allInvalidFields = document.querySelectorAll(`.${this.settings.invalidClass}`);
		if(allInvalidFields) {
			return allInvalidFields[0];
		}
	}

	static getValidatorsFor (field) {
		const result = [];
		const validatorNames = FormValidator.validatorNamesOf(field);
		if (validatorNames) {
			for (let i = 0; i < validatorNames.length; i++) {
				result.push(validators[validatorNames[i]]);
			}
		}
		
		return result;
	}

	static validatorNamesOf (field) {
		const validators = field.getAttribute('data-validate');
		return validators ? validators.split(',') : null;
	}

	static updateInput (input, val) {
//`input.value !== val` does not work. Browser simply ignore any whitespace.	
		if (/\s/g.test(input.value)) {
			input.value = val;
		}
	}

	static init (settings = {}) {
		new FormValidator(settings).validateWhenFocusLeavesInput();
	}
}

export default FormValidator;
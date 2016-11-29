class UiItem {
	constructor ({selector, labelClass='js-item__label', valueClass='js-item__value'}={}) {
		this.labelClass = labelClass;
		this.valueClass = valueClass;
		this.selector = selector;
		this.element = document.querySelector(selector);
	}

	show() {
		this.element.classList.add('su-item--visible');
		this.element.classList.remove('su-item--invisible');
	}

	hide() {
		this.element.classList.add('su-item--invisible');
		this.element.classList.remove('su-item--visible');
	}

	// enable () {
	// 	const els = elementsThatCanBeDisabled(this);
	// 	if (els) {
	// 		for (let i = 0; i < els.length; i++) {
	// 			els[i].setAttibute('disabled');
	// 		}
	// 	}
	// }

	// disable () {
	// 	const els = elementsThatCanBeDisabled(this);
	// 	if (els) {
	// 		for (let i = 0; i < els.length; i++) {
	// 			els[i].setAttibute('disabled', 'true');
	// 		}
	// 	}
	// }

	// setLabelTo (value) {
	// 	const label = this.element.querySelector(`.${this.labelClass}`);
	// 	label.innerHTML = value;
	// }

	// setStatusTo(status) {
	// 	this.element.classList.add(`is-${status}`);
	// }

	// displayIf (_true) {
	// 	_true ? this.display() : this.removeFromDisplay();
	// }

	display () {
		console.log('display');
		this.element.classList.remove('su-item--not-displayed');
	}

	removeFromDisplay () {
		console.log('not display');
		this.element.classList.add('su-item--not-displayed');
	}

	get input () {
		return this.element.querySelector('input');
	}

	// get label () {
	// 	return this.element.querySelector(`.${this.labelClass}`).innerHTML;
	// }

	// isVisible () {
	// 	const styles = window.getComputedStyle(this.element);
	// 	return styles.getPropertyValue('display') !== 'none' && styles.getPropertyValue('visible') === '';
	// }

	// displayError(message) {
	// 	if (message) {
	// 		this.setStatusTo('error');
	// 	}
	// 	this.setLabelTo(message);
	// 	this.display();
	// }

	// onValueChanged (callback) {
	// 	const fields = this.element.classList.contains(this.valueClass) 
	// 		? [this.element] 
	// 		: this.element.querySelectorAll(`.${this.valueClass}`);
	// 	for (let i = 0; i < fields.length; i++) {
	// 		fields[i].addEventListener('change', (event) => {
	// 			callback(event.target.value);
	// 		});
	// 	}
	// }

	get name() {
		const elem = this.element.querySelector(`.${this.valueClass}`);

		if (elem.tagName === 'SELECT') {
			const option = elem.options[elem.selectedIndex];
			return option.innerHTML;
		}
	}

	get value () {
		if(this.element.tagName === 'INPUT') {
// Why not simply this.element.value?
			const form = this.element.closest('form');
			return form.elements[this.element.name].value;
		} else {
			const elem = this.element.querySelector(`.${this.valueClass}`);

			if(elem.tagName === 'SELECT') {
				const options = elem.options[elem.selectedIndex];
				return option.value;
			}

			if(elem.tagName === 'INPUT') {
				const form = elem.closest('form');
				const field = form.elements[elem.name];

				if(field.item) {
					for (let i = 0; i < field.length; i++) {
						let _field = field[i];
						if(_field.checked) {
							return _field.value;
						}
					}
				} else {
					return field.value;
				}
			} 
		}
	}

	set value (val) {
		const inputs = valueInputElementsOf(this);

		if(inputs.length === 1) {
			inputs[0].value = val;
			// triggerChangeEventOn(inputs[0]);
		} else if (inputs.length > 1 && theseInputsAreCheckable(inputs)) {
			setCheckableInputGroupValueTo(inputs, val);
		}
	}

	// hasValue () {
	// 	return this.value && this.value.length > 0;
	// }

	// is (something) {
	// 	const elems = this.valueElements();
	// 	if (elems.length) {
	// 		const elem = elems[0];

	// 		if (something === 'checked') {
	// 			return elem.checked;
	// 		}

	// 		return elem.getAttribute(something) !== null;
	// 	}
	// 	return false;
	// }

	// valueElements () {
	// 	return this.element.classList.contains(this.valueClass)
	// 		? [this.element]
	// 		: this.element.querySelectorAll(`.${this.valueClass}`);
	// }

	// selectOptionAt (idx) {
	// 	const selectBox = valueInputElementOf(this);
	// 	const option = selectBox.getElementByTagName('option')[idx];
	// 	selectBox.value = option.value;
	// 	// triggerChangeEventOn(selectBox);
	// }

	// click () {
	// 	// triggerEventOnDomNode(this.element, 'click');
	// }

	// onClick (listener) {
	// 	this.element.addEventListener('click', listener);
	// }

	// set checked (value) {
	// 	const input = valueInputElementOf(this);
	// 	input.checked = value;
	// }

	// get checked () {
	// 	return this.is('checked');
	// }
}

// function valueInputElementOf (item) {
// 	return item.element.querySelector(`.${item.valueClass}`);
// }

// function valueInputElementsOf (item) {
// 	return item.element.querySelectorAll(`.${item.valueClass}`);
// }

// function elementsThatCanBeDisabled (item) {
// 	if (item.element.tagName === 'BUTTON') {
// 		return [item.element];
// 	} else if (item.valueElements()) {
// 		return item.valueElements();
// 	} else {
// 		return false;
// 	}
// }

// function theseInputsAreCheckable (inputs) {
// 	let result = true;
// 	for (let i = 0; i < inputs.length; i++) {
// 		const type = inputs[i].type;
// 		if(type !== 'radio' && type !== 'checkbox') {
// 			result = false;
// 			break;
// 		}
// 	}
// 	return result;
// }

// function setCheckableInputGroupValueTo (inputs, val) {
// 	for (let i = 0; i < inputs.length; i++) {
// 		const input = inputs[i];
// 		if(input.value === val && !input.checked) {
// 			input.checked = true;
// 			// triggerChangeEventOn(input);
// 		} else if(input.value !== val && input.checked) {
// 			input.checked = false;
// 			// triggerChangeEventOn(input);
// 		}
// 	}
// }
// function triggerChangeEventOn (element) {
// 	if ('createEvent' in document) {
// 		const evt = document.createEvent('HTMLEvents');
// 		evt.initEvent('change', false, true);
// 		element.dispatchEvent(evt);
// 	} else {
// 		element.fireEvent('onchange');
// 	}
// }

export default UiItem;
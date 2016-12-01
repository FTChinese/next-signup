class UiItem {
	constructor ({selector, valueClass='js-field__input'}={}) {
		this.valueClass = valueClass;
		this.selector = selector;
		this.element = document.querySelector(selector);
	}

	enable() {
		const els = controlElementsOf(this);
		if (els) {
			for (let i = 0; i < els.length; i++) {
				els[i].removeAttribute('disabled');
			}
		}
	}

	disable() {
		const els = controlElementsOf(this);
		if (els) {
			for (let i = 0; i < els.length; i++) {
				els[i].setAttribute('disabled', 'true');
			}
		}
	}

	setStatusTo (status) {
		this.element.classList.add(`is-${status}`);
	}

	display () {
		this.element.classList.remove('su-item--not-displayed');
	}

	removeFromDisplay () {
		this.element.classList.add('su-item--not-displayed');
	}
	
	get input () {
		return this.element.querySelector('input');
	}

	onValueChanged (callback) {
		this.element.addEventListener('change', (event) => {
			if (event.target.classList.contains(this.valueClass)) {
				callback(event.target);
			}
		});
	}

	onSubmit(callback) {
		this.element.addEventListener('submit', (event) => {
			event.preventDefault();
			callback(event.target);
		});
	}
	
	onClick (listener) {
		this.element.addEventListener('click', listener);
	}

	hasValue () {
		return this.value && this.value.length > 0;
	}
// check control's Boolean attribute
// required, disabled, checked, selected.
// What about button?
	is (state) {
		const elems = controlElementsOf(this);
		if (elems.length) {
			const elem = elems[0];

			if (state === 'checked') {
				return elem.checked;
			}
			return elem.getAttribute(state) !== null;
		}
		return
	}

	valueElements () {
		return this.element.classList.contains(this.valueClass)
			? [this.element]
			: this.element.querySelectorAll(`.${this.valueClass}`);
	}
}

function controlElementsOf (instance) {
	if (instance.element.tagName === 'BUTTON') {
		return [instance.element];
	} else if (instance.valueElements()) {
		return instance.valueElements()	
	} else {
		return false;
	}
}

export default UiItem;
class UiItem {
	constructor ({selector, valueClass='js-field__input'}={}) {
		this.valueClass = valueClass;
		this.selector = selector;
		this.element = document.querySelector(selector);
	}

	display () {
		this.element.classList.remove('su-item--not-displayed');
	}

	removeFromDisplay () {
		this.element.classList.add('su-item--not-displayed');
	}

	isDisabled() {
		return this.element.disabled;
	}
	
	disable() {
		this.element.disabled = true;
	}

	enable() {
		this.element.disabled = false;
	}

	get input () {
		return this.element.querySelector(`.${this.valueClass}`);
	}
}

export default UiItem;
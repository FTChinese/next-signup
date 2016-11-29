class UiItem {
	constructor ({selector, valueClass='js-field__input'}={}) {
		this.valueClass = valueClass;
		this.selector = selector;
		this.element = document.querySelector(selector);
	}

	display () {
		console.log('display');
		this.element.classList.remove('su-item--not-displayed');
	}

	removeFromDisplay () {
		console.log('not display');
		this.element.classList.add('su-item--not-displayed');
	}

	get input () {
		return this.element.querySelector(`.${this.valueClass}`);
	}
}

export default UiItem;
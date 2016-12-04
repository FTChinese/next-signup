const statusMessage = {
	'emailExists': '请检查您输入的邮箱',
	'submitting': '正在提交...',
	'submitted': '注册成功！',
	'saving': '正在保存...',
	'saved': '保存成功！',
	'email-checking': '检测邮箱是否可用',
	'email-valid': '邮箱可用',
	'email-exists': '该邮箱已注册 <a href="http://user.ftchinese.com/login">直接登录</a>'
};

class UiItem {
	constructor ({selector, labelClass='js-item__label', valueClass='js-field__input'}={}) {
		this.valueClass = valueClass;
		this.labelClass = labelClass;
		this.element = (selector instanceof HTMLElement) ? selector : document.querySelector(selector);
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

	show () {
		this.element.classList.remove('is-invisible');
		this.element.classList.add('is-visible');
	}

	hide() {
		this.element.classList.add('is-invisible');
		this.element.classList.remove('is-visible');
	}
	
	display () {
		this.element.classList.remove('is-hidden');
	}

	removeFromDisplay () {
		this.element.classList.add('is-hidden');
	}
	
	get input () {
		return this.element.querySelector('input');
	}

	setLabelTo (value) {
		const label = this.element.querySelector(`.${this.labelClass}`);
		label.innerHTML = statusMessage[value] || value;
	}

	getDefaultLabel() {
		return this.element.querySelector(`.${this.labelClass}`).innerHTML;
	}

	setStatusTo (status) {
		this.element.classList.add(`is-${status}`);
	}

	displayError(message) {
		if(message) {
			this.setStatusTo('error');
		}
		this.setLabelTo(message);
		this.display();
		this.element.scrollIntoView();
	}

	onValueChanged (callback) {
		this.element.addEventListener('change', (event) => {
			if (event.target.classList.contains(this.valueClass)) {
				callback(event.target);
			}
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
		return null;
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
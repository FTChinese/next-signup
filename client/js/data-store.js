import setDefault from './set-default.js';
class DataStore {
	constructor(settings={}) {
		setDefault(settings).to({
			selector: '',
			formClass: 'js-validate-form',
			fieldInputClass: 'js-field__input'
		});

		this.form = getFormElement();
		this.settings = settings;

		function getFormElement () {
			return settings.selector.length
					? document.querySelector(settings.selector)
					: document.querySelector(`.${settings.formClass}`);
		}

		this.saveData = this.saveData.bind(this);
		this.form.addEventListener('change', this.saveData);
		this.prePopulate();
	}

	saveData(event) {
		if (event.target.tagName !== 'INPUT') {
			return;
		}
		const target = event.target;

		const key = target.name;
		let value = target.value;
// checkbox's value is always `on` whether you check or uncheck it.
		if (target.type === 'checkbox') {
			target.checked ? value = true : value = false;
		}

		this.setValue(key, value);
	}

	setValue(key, value) {
		window.localStorage.setItem(key, value);
	}

	getValue(key) {
		return window.localStorage.getItem(key);
	}

	prePopulate() {
		const elements = this.form.elements;
		console.log(elements[0]);
	}
}

// function populate(formEl) {
// 	const elements = formEl.elements
// 	for (let i = 0; i < elements.length; i++) {
// 		const element = elements[i];
// 		const key = element.name;
// 		if (localStorage.getItem(key)) {
// 			switch (element.type) {
// 				case 'radio':
// 					if (element.value === localStorage.getItem(key)) {
// 						element.checked = true;
// 					}
// 					break;

// 				default:
// 					element.value = localStorage.getItem(key);
// 			}
			
// 			console.log(key, localStorage.getItem(key));
// 		}
// 	}
// }
export default DataStore;
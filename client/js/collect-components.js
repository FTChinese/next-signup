function collectElements(rootEl) {
		if (!rootEl) {
			return new Error('No rootEl!');
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		let labelText = rootEl.querySelector('.su-field__label').textContent;
		let errorText = rootEl.querySelector('.su-field__error').textContent;

		let inputEl = rootEl.querySelector('.su-field__input');
		let name = inputEl.name;
		let checkurl = inputEl.getAttribute('data-checkurl');

		let patterns = rootEl.getAttribute('data-validate').split(',');

		return {
			rootEl: rootEl,
			labelText: labelText,
			errorText: errorText,
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

export default getUnityComponents;
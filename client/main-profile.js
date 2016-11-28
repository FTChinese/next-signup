import Dropdown from './js/dropdown.js';

import regions from './js/data/regions.js';
import sectors from './js/data/sectors.js';
import departments from './js/data/departments.js';
import posts from './js/data/posts.js';


Dropdown.init([regions, sectors, departments, posts]);

function populate(formEl) {
	const elements = formEl.elements
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		const key = element.name;
		if (localStorage.getItem(key)) {
			switch (element.type) {
				case 'radio':
					if (element.value === localStorage.getItem(key)) {
						element.checked = true;
					}
					break;

				default:
					element.value = localStorage.getItem(key);
			}
			
			console.log(key, localStorage.getItem(key));
		}
	}
}

const radioButton = document.getElementById('gender-m');
console.log(radioButton);
radioButton.addEventListener('change', (e) => {
	console.log(e.target.checked);
	if (e.target.checked) {
		localStorage.setItem(e.target.name, e.target.value);
	}
});
const checkbox = document.getElementById('subscipt-1');
checkbox.addEventListener('change', (e) => {
	console.log(e.target.checked);
	if (e.target.checked) {
		localStorage.setItem(e.target.name, e.target.value);
	}
});
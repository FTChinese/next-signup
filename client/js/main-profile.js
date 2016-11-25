import Checked from './checked.js';
import Dropdown from './dropdown.js';
import Validate from './validate.js';
import Submit from './submit.js';

import regions from './data/regions.js';
import sectors from './data/sectors.js';
import departments from './data/departments.js';
import posts from './data/posts.js';

// const checked = new Checked('#agreement-container');
Validate.init();

Dropdown.init('#profile-select', [regions, sectors, departments, posts]);

new Submit('#profile-basic', {
	callback: function(formEl) {
		console.log('profile-basic submitted');
	}
});

new Submit('#profile-select', {
	callback: function(formEl) {
		console.log('profile-select submitted');
	}
});

new Submit('#subscription', {
	callback: function(formEl) {
		console.log('subscription submitted');
	}
});

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

populate(document.getElementById('profile-basic'));
populate(document.getElementById('profile-select'));
populate(document.getElementById('subscription'));

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
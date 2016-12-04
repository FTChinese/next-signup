import serialize from './serialize.js';

function checkIfEmailExists(inputEl) {
	const url = inputEl.getAttribute('data-checkurl');
	return fetch(`${url}?e=${inputEl.value}`, {
		method: 'GET',
	})
	.then((response) => {
		return response.text();
	});
}

function submitUserData(url, form) {
	const formData = serialize(form, {
		hash: true,
		empty: true
	});
	formData.id = form.id;
	formData.CAPTCHA = window.CAPTCHA;
	if (window.localStorage.getItem('userId')) {
		formData.userId = window.localStorage.getItem('userId');
	}
	return fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	})
	.then((response) => {
		return response.json();
	}, (error) => {
		return Promise.reject(error);
	});
}

export {checkIfEmailExists, submitUserData};
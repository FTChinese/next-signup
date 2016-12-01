import serialize from './serialize.js';

function postData(url, data) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log('Getting response from server');
		return response.json();
	});
}

function checkIfEmailExists(inputEl) {
	const url = inputEl.getAttribute('data-checkurl');
	return fetch(`${url}?e=${inputEl.value}`, {
		method: 'GET',
	})
	.then((response) => {
		return response.text();
	});
}

function submitUserData(form) {
	const formData = serialize(form, {
		hash: true,
		empty: true
	});
	const url = form.action;
	formData.id = form.id;
	formData.CAPTCHA = window.CAPTCHA;
// response: {submitSucceeds: true} or {submitSucceds: false}	
	console.log('submiting data:');
	console.log(formData);
	return postData(url, formData);
}

export {postData, checkIfEmailExists, submitUserData};
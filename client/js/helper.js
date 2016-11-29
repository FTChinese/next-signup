import serialize from './serialize.js';
// It creates an element with the given name and attributes and appends all further arguments it gets as child nodes, automatically converting strings to text nodes.
function createElement(name, attributes) {
	var node = document.createElement(name);
	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) {
				node.setAttribute(attr, attributes[attr]);
			}
		}
	}

	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == 'string') {
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}

function buildList(data, prefix) {
	const ulEl = document.createElement('ul');

	for (let i = 0; i < data.length; i++) {

		const item = data[i];
/*
 * If prefix does not exist, use index `i` as `data-order`'s value
 * If prefix exists, use it to construct  the value and pass it to next level.
 * @example data-order="0-1-3"
 * This is used to reflect the data path.
*/
		const dataOrder = (prefix === null) ? i : prefix + '-' + i;

		const liEl = createElement('li', {
			'data-order': dataOrder
		});

		if (item.children) {
			const spanEl = createElement('span', {
				'data-order': dataOrder
			}, item.name);
			liEl.appendChild(spanEl);
			liEl.appendChild(buildList(item.children, dataOrder));
		} else {
			liEl.textContent = item.name;
		}
		ulEl.appendChild(liEl);
	}

	return ulEl;
}

/*
 * @return {Object}
 {
	history: [],
	name: String,
	children: Array or null
 }
*/
function search(data, depth) {
	var position = 0;
	const history = [];

	function getData(data, index) {
		const currentLevel = data[index];
		history.push(currentLevel.name);
		// console.log(history);
		// console.log(currentLevel);
		
		if (position === depth.length -1) {
			return currentLevel;
		} else {
			position++;
			return getData(currentLevel.children, depth[position])
		}
	}

	const result = getData(data, depth[position]);
	return Object.assign({history: history}, result);
}

function postData(url, data) {
	return 	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => {
		console.log('Getting response from server');
		// submitFailed: true;
		
		return response.json();
	});
}

function submitForm(form) {
	const formData = serialize(form, {
		hash: true,
		empty: true
	});
	const url = form.action;
	formData.id = form.id;
	formData.CAPTCHA = window.CAPTCHA;
// response: {submitFailed: true} or {submitFailed: false}	
	return postData(url, formData)
		.then(response => {
			if(response.submitFailed) {
				form.qerySelector('.o-forms-message').classList.add('error');
				return Promise.reject('Submit failed');
			} else {
				return Promise.resolve();
			}
		});
}

export {createElement, buildList, search, postData, submitForm};